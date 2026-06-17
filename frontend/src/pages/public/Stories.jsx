import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import ContentGallery from "../../components/common/ContentGallery";
import CustomFieldsDisplay from "../../components/common/CustomFieldsDisplay";
import EmptyState from "../../components/common/EmptyState";
import SectionReveal from "../../components/common/SectionReveal";

export default function Stories() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/stories").then(({ data }) => setItems(data)).catch(() => setItems([])); }, []);

  return (
    <SectionReveal className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Stories</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Moments that shaped the work.</h1>
      {items.length === 0 ? <div className="mt-10"><EmptyState /></div> : (
        <div className="mt-12 grid gap-4">
          {items.map((item) => (
            <div key={item._id} className="glass rounded-lg p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{new Date(item.date).toLocaleDateString()} · {item.type}</p>
              <h2 className="mt-3 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-white/58">{item.description}</p>
              {item.image ? <img src={item.image} alt={item.title} className="mt-5 max-h-[420px] w-full rounded-lg border border-white/10 object-cover" /> : null}
              <ContentGallery images={item.gallery} title="Story gallery" />
              <CustomFieldsDisplay fields={item.customFields} />
            </div>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
