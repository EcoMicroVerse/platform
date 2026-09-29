
type Props = {
  status: "draft" | "review" | "published";
};

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    draft:
      "bg-slate-700 text-slate-300",
    review:
      "bg-yellow-500/20 text-yellow-300",
    published:
      "bg-teal-500/20 text-teal-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}