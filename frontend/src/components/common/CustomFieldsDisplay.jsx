import ContentGallery from "./ContentGallery";
import AppImage from "./AppImage";

function normalizeFields(fields) {
  return Array.isArray(fields) ? fields.filter((field) => field?.label) : [];
}

function hasValue(field) {
  if (field.type === "gallery") return Array.isArray(field.value) && field.value.length > 0;
  return Boolean(field.value);
}

export default function CustomFieldsDisplay({ fields, title = "More details", className = "" }) {
  const items = normalizeFields(fields).filter(hasValue);
  if (!items.length) return null;

  return (
    <section className={`mt-10 ${className}`}>
      <p className="text-sm uppercase tracking-[0.24em] text-(--text-muted)">{title}</p>
      <div className="mt-5 grid gap-4">
        {items.map((field, index) => {
          if (field.type === "image") {
            return (
              <div key={`${field.label}-${index}`}>
                <h2 className="text-xl font-semibold">{field.label}</h2>
                <AppImage src={field.value} alt={field.label} wrapperClassName="mt-3 w-full rounded-lg border border-(--border)" className="h-full w-full object-cover" />
              </div>
            );
          }

          if (field.type === "gallery") {
            return <ContentGallery key={`${field.label}-${index}`} title={field.label} images={field.value} className="mt-0" />;
          }

          return (
            <div key={`${field.label}-${index}`} className="rounded-lg border border-(--border) bg-(--card) p-4">
              <h2 className="text-xl font-semibold">{field.label}</h2>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-(--text-muted)">{field.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
