"use client";

type Props = {
  calendar:{
    date:string;
    count:number;
  }[];
};

export default function ActivityCalendar({calendar}:Props){

  return(

    <div className="rounded-xl bg-[#04111b] p-5">

      <div className="mb-4 text-sm font-semibold text-white">
        Editorial Activity
      </div>

      <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1">

        {calendar.slice(-91).map((day)=>{

          const colour =
            day.count===0
              ? "bg-slate-800"
              : day.count===1
                ? "bg-teal-700"
                : day.count===2
                  ? "bg-teal-500"
                  : "bg-teal-300";

          return(

            <div
              key={day.date}
              title={`${day.date}: ${day.count}`}
              className={`h-4 w-4 rounded ${colour}`}
            />

          );

        })}

      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
  <span>Last 3 months</span>

  <div className="flex items-center gap-1">
    <span>Less</span>

    <div className="h-3 w-3 rounded bg-slate-800"></div>
    <div className="h-3 w-3 rounded bg-teal-700"></div>
    <div className="h-3 w-3 rounded bg-teal-500"></div>
    <div className="h-3 w-3 rounded bg-teal-300"></div>

    <span>More</span>
  </div>
</div>

    </div>

  );

}
