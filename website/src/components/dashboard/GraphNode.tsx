export default function GraphNode({data}:any){

  const colors={
    paper:"bg-slate-700 border-slate-500",
    collection:"bg-teal-700 border-teal-400",
    profile:"bg-purple-700 border-purple-400",
    method:"bg-orange-700 border-orange-400",
  };

  const style=colors[data.type as keyof typeof colors] || colors.paper;

  return(
    <div className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold shadow-lg ${style}`}>
      {data.label}
    </div>
  );

}