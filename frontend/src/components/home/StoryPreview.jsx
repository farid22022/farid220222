import SectionReveal from "../common/SectionReveal";
import EmptyState from "../common/EmptyState";

export default function StoryPreview({ stories = [] }) {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/40">Timeline</p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">Stories from the build path</h2>
      </div>
      {stories.length === 0 ? (
        <EmptyState title="No featured stories yet" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((story) => (
            <div key={story._id} className="glass overflow-hidden rounded-lg p-5">
              {story.image ? <img src={story.image} alt={story.title} className="-mx-5 -mt-5 mb-5 h-44 w-[calc(100%+2.5rem)] object-cover" /> : null}
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{story.type}</p>
              <h3 className="mt-3 text-xl font-semibold">{story.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{story.description}</p>
            </div>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
