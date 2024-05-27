import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Lost: 4000,
    Found: 2400,
  },
  {
    name: "Feb",
    Lost: 3000,
    Found: 1398,
  },
  {
    name: "Mar",
    Lost: 2000,
    Found: 9800,
  },
  {
    name: "Apr",
    Lost: 2780,
    Found: 3908,
  },
  {
    name: "May",
    Lost: 1890,
    Found: 4800,
  },
  {
    name: "Jun",
    Lost: 2390,
    Found: 3800,
  },
  {
    name: "July",
    Lost: 3490,
    Found: 4300,
  },
  {
    name: "Aug",
    Lost: 2000,
    Found: 9800,
  },
  {
    name: "Sep",
    Lost: 2780,
    Found: 3908,
  },
  {
    name: "Oct",
    Lost: 1890,
    Found: 4800,
  },
  {
    name: "Nov",
    Lost: 2390,
    Found: 3800,
  },
  {
    name: "Dec",
    Lost: 3490,
    Found: 4300,
  },
];

export default function TransactionChart() {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Lost" fill="#0ea5e9" />
            <Bar dataKey="Found" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}