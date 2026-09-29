
type Props = {
  label: string;
  status?: "success" | "warning" | "info";
};

export default function StatusBadge({
  label,
  status = "info",
}: Props) {
  const styles = {
    success:
      "bg-green-500/10 text-green-300",

    warning:
      "bg-yellow-500/10 text-yellow-300",

    info:
      "bg-teal-500/10 text-teal-300",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm ${styles[status]}`}
    >
      {label}
    </span>
  );
}