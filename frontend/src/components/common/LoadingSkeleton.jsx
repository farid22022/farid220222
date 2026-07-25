export default function LoadingSkeleton({ cards = 3, className = "" }) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`} aria-label="Loading">
      {Array.from({ length: cards }, (_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-lg border border-(--border) bg-(--card)">
          <div className="aspect-[16/9] bg-(--card-solid)" />
          <div className="grid gap-3 p-5">
            <div className="h-3 w-24 rounded bg-(--card-solid)" />
            <div className="h-6 w-3/4 rounded bg-(--card-solid)" />
            <div className="h-3 w-full rounded bg-(--card-solid)" />
            <div className="h-3 w-5/6 rounded bg-(--card-solid)" />
          </div>
        </div>
      ))}
    </div>
  );
}
