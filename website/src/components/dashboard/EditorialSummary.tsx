type Props = {
  approved: number;
};

export default function EditorialSummary({
  approved,
}: Props) {

  return (

    <div className="rounded-3xl border border-slate-800 bg-[#061426] p-5">

      <div className="text-xs uppercase tracking-widest text-slate-500">
        Editorial Summary
      </div>

      <div className="mt-3 space-y-2 text-sm">

        <div>
          📄 Research Objects: {approved}
        </div>

        <div>
          ✍ AI Draft Generator: Ready
        </div>

        <div>
          🚀 Publishing Pipeline: Connected
        </div>

      </div>

    </div>

  );

}