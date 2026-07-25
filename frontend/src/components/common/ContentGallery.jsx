function normalizeImages(images) {
  return Array.isArray(images) ? images.filter(Boolean) : [];
}

export default function ContentGallery({ images, title = "Gallery", className = "" }) {
  const items = normalizeImages(images);
  if (!items.length) return null;

  return (
    <section className={className || "mt-10"}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((image, index) => (
          <AppImage
            key={`${image}-${index}`}
            src={image}
            alt={`${title} ${index + 1}`}
            wrapperClassName="min-h-56 w-full rounded-lg border border-(--border)"
            className="h-full min-h-56 w-full object-cover"
          />
        ))}
      </div>
    </section>
  );
}
import AppImage from "./AppImage";
