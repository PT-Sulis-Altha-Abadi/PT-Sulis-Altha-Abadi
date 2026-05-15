export default function StatCard({ value, label }) {
  return (
    <div className="border-l border-white/20 px-5 first:border-l-0">
      <p className="text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm leading-5 text-white/70">{label}</p>
    </div>
  );
}
