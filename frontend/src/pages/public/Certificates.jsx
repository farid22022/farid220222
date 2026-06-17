import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import EmptyState from "../../components/common/EmptyState";
import SectionReveal from "../../components/common/SectionReveal";

export default function Certificates() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/certificates").then(({ data }) => setItems(data)).catch(() => setItems([])); }, []);

  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Certificates</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Learning receipts from the journey.</h1>
      {items.length === 0 ? <div className="mt-10"><EmptyState /></div> : (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <a key={item._id} href={item.credentialUrl || "#"} className="glass rounded-lg p-5">
              <div className="aspect-video rounded-md bg-white/[0.04]">{item.certificateImage ? <img src={item.certificateImage} alt={item.title} className="h-full w-full rounded-md object-cover" /> : null}</div>
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-white/55">{item.issuer}</p>
            </a>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
