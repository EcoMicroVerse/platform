type Props = {
  streak:number;
  total:number;
};

export default function MomentumCard({streak,total}:Props){

  return(

    <div className="rounded-xl bg-[#04111b] p-5">

      <div className="text-xs uppercase text-slate-500">
        Publishing Streak
      </div>

      <div className="mt-3 text-4xl font-bold text-white">
        {streak}
      </div>

      <div className="mt-2 text-sm text-slate-400">
        {total} editorial events recorded
      </div>

    </div>

  );

}
