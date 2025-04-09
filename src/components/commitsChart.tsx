import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type CommitsChartProps = {
  data: number[];
};

const CommitsChart: React.FC<CommitsChartProps> = ({ data }) => {
  const fullDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date().getDay();

  const rotatedDays = [...fullDays.slice(today + 1), ...fullDays.slice(0, today + 1)];

  const chartData = rotatedDays.map((day, i) => ({
    day,
    commits: data[(i + today + 1) % 7],
  }));

  return (
    <div className="mt-5">
      <h2 className="mb-3">Commits (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="commits" fill="#0d6efd" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitsChart;
