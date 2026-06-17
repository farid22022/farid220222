import SectionReveal from "../common/SectionReveal";
import EmptyState from "../common/EmptyState";

export default function CertificatePreview({ certificates = [] }) {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/40">Proof of practice</p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">Certificates</h2>
      </div>
      {certificates.length === 0 ? (
        <EmptyState title="No featured certificates yet" />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {certificates.map((certificate) => (
            <a key={certificate._id} href={certificate.credentialUrl || "#"} className="glass rounded-lg p-5">
              <div className="aspect-video overflow-hidden rounded-md bg-white/[0.04]">
                {certificate.certificateImage ? <img src={certificate.certificateImage} alt={certificate.title} className="h-full w-full object-cover" /> : null}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{certificate.title}</h3>
              <p className="mt-2 text-sm text-white/50">{certificate.issuer}</p>
            </a>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
