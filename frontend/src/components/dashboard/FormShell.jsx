import { Save } from "lucide-react";

export default function FormShell({ title, children, onSubmit, loading, submitLabel = "Save changes" }) {
  return (
    <form onSubmit={onSubmit} className="glass mx-auto max-w-4xl rounded-lg p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-60">
          <Save className="h-4 w-4" />
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
      <div className="grid gap-4">{children}</div>
    </form>
  );
}
