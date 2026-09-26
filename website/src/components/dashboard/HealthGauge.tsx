"use client";

type Props = {
  score:number;
};

export default function HealthGauge({score}:Props){

  const angle = Math.max(0,Math.min(score,100))*1.8;

  return(

    <div className="rounded-xl bg-[#04111b] p-5">

      <div className="mb-4 text-sm font-semibold text-white">
        Repository Health
      </div>

      <div className="flex justify-center">

        <svg width="220" height="130">

          <path
            d="M20 110 A90 90 0 0 1 200 110"
            stroke="#1e293b"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />

          <path
            d="M20 110 A90 90 0 0 1 200 110"
            stroke="#2dd4bf"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray={`${score} 100`}
          />

          <text
            x="110"
            y="78"
            textAnchor="middle"
            fill="white"
            fontSize="30"
            fontWeight="bold"
          >
            {score}
          </text>

          <text
            x="110"
            y="98"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="11"
          >
            Editorial Health
          </text>

        </svg>

      </div>

    </div>

  );

}
