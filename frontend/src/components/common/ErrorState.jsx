import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({ title = "Could not load this content", onRetry }) {
  return (
    <div className="rounded-lg border border-red-400/20 bg-red-400/[0.06] p-6 text-center">
      <AlertTriangle className="mx-auto h-7 w-7 text-red-300" />
      <p className="mt-3 text-sm text-red-100/80">{title}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-md border border-(--border) px-3 py-2 text-sm text-(--text-muted)"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      ) : null}
    </div>
  );
}
