"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";

type Props = {
  analytics: any;
};

export default function FounderAnalytics({ analytics }: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-[#061426] p-6">

      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-teal-300">
          Editorial Analytics
        </div>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Editorial Intelligence
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <MetricCard
          title="Average AI Score"
          value={analytics.average_score}
        />

        <MetricCard
          title="Repository Health"
          value={analytics.health_score}
        />

        <MetricCard
          title="Collections"
          value={Object.keys(analytics.collections).length}
        />

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <ChartCard title="Collection Growth">

  <ResponsiveContainer width="100%" height={260}>

    <BarChart
      data={analytics.collection_chart}
      margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
    >

      <XAxis
        dataKey="name"
        tick={{ fill: "#94a3b8", fontSize: 12 }}
        axisLine={{ stroke: "#334155" }}
        tickLine={{ stroke: "#334155" }}
      />

      <Tooltip
        contentStyle={{
          background: "#04111b",
          border: "1px solid #0f766e",
          color: "#fff",
        }}
      />

      <Bar
        dataKey="value"
        fill="#2dd4bf"
        radius={[8, 8, 0, 0]}
      />

    </BarChart>

  </ResponsiveContainer>

</ChartCard>

        <ChartCard title="Priority Distribution">

  <ResponsiveContainer width="100%" height={280}>

    <PieChart>

      <Pie
        data={analytics.priority_chart}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={45}
        outerRadius={85}
        fill="#2dd4bf"
        label
      />

      <Tooltip
        contentStyle={{
          background: "#04111b",
          border: "1px solid #0f766e",
          color: "#fff",
        }}
      />

    </PieChart>

  </ResponsiveContainer>

</ChartCard>

      </div>

      <div className="mt-8">

        <ChartCard title="Trending Methods">

  <ResponsiveContainer width="100%" height={260}>

    <BarChart
      layout="vertical"
      data={analytics.method_chart}
      margin={{ top: 10, right: 20, left: 90, bottom: 10 }}
    >

      <XAxis
        type="number"
        tick={{ fill: "#94a3b8" }}
        axisLine={{ stroke: "#334155" }}
      />

      <YAxis
        type="category"
        dataKey="name"
        width={80}
        tick={{ fill: "#94a3b8", fontSize: 11 }}
        axisLine={{ stroke: "#334155" }}
      />

      <Tooltip
        contentStyle={{
          background: "#04111b",
          border: "1px solid #0f766e",
          color: "#fff",
        }}
      />

      <Bar
        dataKey="value"
        fill="#2dd4bf"
        radius={[0, 8, 8, 0]}
      />

    </BarChart>

  </ResponsiveContainer>

</ChartCard>

      </div>

    </div>
  );
}

function MetricCard({
  title,
  value,
}:{
  title:string;
  value:string|number;
}){

  return(

    <div className="rounded-xl bg-[#04111b] p-5">

      <div className="text-xs uppercase text-slate-500">
        {title}
      </div>

      <div className="mt-3 text-3xl font-bold text-white">
        {value}
      </div>

    </div>

  );

}

function ChartCard({
  title,
  children,
}:{
  title:string;
  children:React.ReactNode;
}){

  return(

    <div className="rounded-xl bg-[#04111b] p-5">

      <div className="mb-4 text-sm font-semibold text-white">
        {title}
      </div>

      {children}

    </div>

  );

}