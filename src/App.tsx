import { useState } from 'react';
import './App.css';
import RepoList from './components/RepoList';
import CommitsChart from './components/commitsChart';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';


function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [commitData, setCommitData] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    setError('');
    setRepos([]);
    setCommitData([]);
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos`);
      if(!res.ok) throw new Error('User not found');
      const data = await res.json();
      setRepos(data);

      const commitPromises = data.slice(0,3).map(async (repo:any) => {
        const r = await fetch(`https://api.github.com/repos/${username}/${repo.name}/stats/commit_activity`);
        return await r.json();
      });

      const allRepoCommits = await Promise.all(commitPromises);
      const dailyTotal = Array(7).fill(0);

      allRepoCommits.forEach((weekdata: any[]) =>{
        if(!Array.isArray(weekdata)) return;
        weekdata.slice(-1).forEach(week =>{
          week.days.forEach((count:number, i:number) =>{
            dailyTotal[i] += count;
          });
        });
      });
      setCommitData(dailyTotal);
    } catch (err:any) {
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">GitHub User Profile Analyzer</h1>
      <div className="input-group mb-3">
      <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchUserData()}
        />
        <Button onClick={fetchUserData}>Analyze</Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <RepoList repos={repos} />
      {commitData.length > 0 && <CommitsChart data={commitData} />}
      </div>
  );
}

export default App;
