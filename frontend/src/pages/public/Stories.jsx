import AppImage from "../../components/common/AppImage";
import ContentGallery from "../../components/common/ContentGallery";
import CustomFieldsDisplay from "../../components/common/CustomFieldsDisplay";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";
import { useContentList } from "../../hooks/useContent";

const typeColors = {
  milestone: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  achievement: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  learning: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  project: "bg-purple-500/15 text-purple-400 border-purple-500/25"
};

function typeClass(type) {
  return typeColors[type?.toLowerCase()] ?? "bg-(--card) text-(--text-muted) border-(--border)";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function Stories() {
  const { data: items = [], isLoading, isError, refetch } = useContentList("stories");

  return (
    <SectionReveal className="mx-auto max-w-4xl px-4 py-24">
      <Seo
        title="Stories — Moments from Farid Hossen Rehad's Build Path"
        description="A timeline of milestones, learnings, and turning points from Md. Farid Hossen Rehad's (Farid) journey as a full stack and AI/ML developer."
        path="/stories"
      />
      <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Stories</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Moments that shaped the work.</h1>

      {isLoading ? <LoadingSkeleton cards={2} className="mt-10" /> : null}
      {isError ? <div className="mt-10"><ErrorState onRetry={refetch} /></div> : null}
      {!isLoading && !isError && items.length === 0 ? <div className="mt-10"><EmptyState /></div> : null}

      {!isLoading && !isError && items.length > 0 ? (
        <div className="mt-14 space-y-0">
          {items.map((item, index) => (
            <div key={item._id} className="relative flex gap-6">
              {/* Timeline spine */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--border) bg-(--accent)/15 text-sm font-bold text-(--accent)">
                  {index + 1}
                </div>
                {index < items.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-linear-to-b from-(--border) to-transparent" style={{ minHeight: "3rem" }} />
                )}
              </div>

              {/* Content */}
              <div className={`glass mb-6 w-full rounded-lg p-6 ${index < items.length - 1 ? "mb-8" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.type && (
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${typeClass(item.type)}`}>
                          {item.type}
                        </span>
                      )}
                      {item.featured && (
                        <span className="rounded-full bg-(--accent)/15 px-2.5 py-0.5 text-xs font-medium text-(--accent)">
                          Featured
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold">{item.title}</h2>
                  </div>
                  {item.date && (
                    <span className="shrink-0 rounded-full border border-(--border) px-3 py-1 text-xs text-(--text-muted)">
                      {formatDate(item.date)}
                    </span>
                  )}
                </div>
                <p className="mt-3 leading-7 text-(--text-muted)">{item.description}</p>
                {item.image && (
                  <AppImage
                    src={item.image}
                    alt={item.title}
                    wrapperClassName="mt-5 max-h-95 w-full overflow-hidden rounded-lg border border-(--border)"
                    className="h-full max-h-95 w-full object-cover"
                  />
                )}
                <ContentGallery images={item.gallery} title="Story gallery" />
                <CustomFieldsDisplay fields={item.customFields} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </SectionReveal>
  );
}
