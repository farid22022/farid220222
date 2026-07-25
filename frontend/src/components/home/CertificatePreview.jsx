import { Link } from "react-router-dom";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import SectionReveal from "../common/SectionReveal";
import EmptyState from "../common/EmptyState";
import AppImage from "../common/AppImage";

export default function CertificatePreview({ certificates = [] }) {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Proof of practice</p>
          <h2 className="mt-3 text-3xl font-bold text-(--text) md:text-5xl">Certificates</h2>
        </div>
        <Link
          to="/certificates"
          className="hidden items-center gap-2 text-sm font-medium text-(--text-muted) transition hover:text-(--text) sm:flex"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {certificates.length === 0 ? (
        <EmptyState title="No featured certificates yet" />
      ) : (
        <>
          <div className="grid gap-4">
            {certificates.map((cert) => (
              <Link
                key={cert._id}
                to={`/certificates/${cert.slug || cert._id}`}
                className="glass group flex flex-col overflow-hidden rounded-lg motion-card transition hover:border-(--border)"
              >
                {cert.certificateImage ? (
                  <AppImage
                    src={cert.certificateImage}
                    alt={cert.title}
                    wrapperClassName="aspect-video bg-(--card) shrink-0"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-(--card)">
                    <Award className="h-12 w-12 text-(--text-muted)" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold leading-snug text-(--text)">{cert.title}</h3>
                  <p className="mt-1 text-sm text-(--text-muted)">{cert.issuer}</p>
                  {cert.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-(--border) px-2 py-0.5 text-[10px] text-(--text-muted)"
                        >
                          {s}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="rounded-md border border-(--border) px-2 py-0.5 text-[10px] text-(--text-muted)">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-auto flex items-center gap-3 pt-4">
                    <span className="text-xs text-(--text-muted) transition group-hover:text-(--text)">
                      View details →
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-xs text-(--text-muted) transition hover:text-(--text)"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              to="/certificates"
              className="flex items-center justify-center gap-2 text-sm font-medium text-(--text-muted) transition hover:text-(--text)"
            >
              View all certificates <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </SectionReveal>
  );
}
