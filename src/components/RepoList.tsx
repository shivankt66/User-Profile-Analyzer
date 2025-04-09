import React from "react";

type RepoListProps = {
    repos : any[];
};

const RepoList: React.FC<RepoListProps> = ({repos}) => {
    if (!repos.length) return null;
    return(
        <div>
            <h2 className="mt-5 mb-3">Repositories</h2>
            <ul className="list-group">
                {repos.map((repo)=> (
                    <li key={repo.id} className="list-group-item">
                        <h5>{repo.name}</h5>
                        <p className="text-muted">{repo.description}</p>
                        <small className="text-muted">
                          ⭐ {repo.stargazers_count} &nbsp;&nbsp; 🛠️ {repo.language}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default RepoList;