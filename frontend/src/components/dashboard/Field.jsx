export function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm text-white/55">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white outline-none transition focus:border-white/30";
