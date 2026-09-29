
"use client";

type Metric = {
  label: string;
  score: number;
};

export default function QualityRadar({
  metrics,
}: {
  metrics: Metric[];
}) {
  const size = 220;
  const center = size / 2;
  const radius = 80;

  const points = metrics
    .map((metric,index) => {
      const angle =
        (Math.PI * 2 * index) /
          metrics.length -
        Math.PI / 2;

      const r =
        (metric.score / 100) * radius;

      return `${center + Math.cos(angle) * r},${
        center + Math.sin(angle) * r
      }`;
    })
    .join(" ");

  return (
    <div className="flex justify-center">

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-56 w-56"
      >
        {[20,40,60,80,100].map(level=>(
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level/100)*radius}
            fill="none"
            stroke="rgba(148,163,184,.15)"
          />
        ))}

        {metrics.map((metric,index)=>{
          const angle =
            (Math.PI*2*index)/
              metrics.length -
            Math.PI/2;

          const x =
            center +
            Math.cos(angle)*
              (radius+18);

          const y =
            center +
            Math.sin(angle)*
              (radius+18);

          return (
            <text
              key={metric.label}
              x={x}
              y={y}
              textAnchor="middle"
              className="fill-slate-300 text-[9px]"
            >
              {metric.label}
            </text>
          );
        })}

        <polygon
          points={points}
          fill="rgba(45,212,191,.25)"
          stroke="#2dd4bf"
          strokeWidth="2"
        />
      </svg>

    </div>
  );
}