export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/45">{label}</p>
        {Icon ? <Icon className="h-5 w-5 text-[var(--accent)]" /> : null}
      </div>
      <p className="mt-5 text-4xl font-black">{value}</p>
    </div>
  );
}
