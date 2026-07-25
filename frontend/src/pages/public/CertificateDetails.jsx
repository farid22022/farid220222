import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Timer,
  X,
  ZoomIn,
} from "lucide-react";
import AppImage from "../../components/common/AppImage";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import Seo from "../../components/common/Seo";
import { useContentBySlug } from "../../hooks/useContent";
import toast from "react-hot-toast";

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ValidityStatus({ issueDate, expiryDate }) {
  const now = new Date();
  const expiry = expiryDate ? new Date(expiryDate) : null;

  if (!expiry) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        No Expiry
      </span>
    );
  }

  const daysLeft = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
        <ShieldAlert className="h-3.5 w-3.5" />
        Expired
      </span>
    );
  }

  if (daysLeft <= 90) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
        <Timer className="h-3.5 w-3.5" />
        Expires in {daysLeft}d
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
      <ShieldCheck className="h-3.5 w-3.5" />
      Valid
    </span>
  );
}

function Lightbox({ src, alt, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/60 transition hover:bg-white/20 hover:text-white"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function MetaRow({ icon: Icon, label, value, children }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-(--border) last:border-b-0">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-(--card)">
        <Icon className="h-3.5 w-3.5 text-(--text-muted)" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-(--text-muted)">{label}</p>
        {children || <p className="mt-0.5 text-sm text-(--text)">{value}</p>}
      </div>
    </div>
  );
}

export default function CertificateDetails() {
  const { slug } = useParams();
  const { data: cert, isLoading, isError, refetch } = useContentBySlug("certificates", slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedId, setCopiedId] = useState(false);

  const copyCredentialId = useCallback(() => {
    if (!cert?.credentialId) return;
    navigator.clipboard.writeText(cert.credentialId);
    setCopiedId(true);
    toast.success("Credential ID copied!");
    setTimeout(() => setCopiedId(false), 2000);
  }, [cert?.credentialId]);

  if (isLoading) return <Loader label="Loading certificate" />;
  if (isError) return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <ErrorState onRetry={refetch} />
    </div>
  );
  if (!cert) return null;

  const hasSkills = cert.skills?.length > 0;
  const tabs = [
    { id: "overview", label: "Overview" },
    ...(hasSkills ? [{ id: "skills", label: `Skills (${cert.skills.length})` }] : []),
  ];

  return (
    <>
      <Lightbox
        src={cert.certificateImage}
        alt={cert.title}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <Seo
          title={`${cert.title} — Farid Hossen Rehad`}
          description={cert.description || `${cert.title}, issued by ${cert.issuer}, earned by Md. Farid Hossen Rehad (Farid).`}
          path={`/certificates/${cert.slug || cert._id}`}
          image={cert.certificateImage}
          type="article"
        />
        {/* Back */}
        <Link
          to="/certificates"
          className="mb-10 inline-flex items-center gap-2 text-sm text-(--text-muted) transition hover:text-(--text)"
        >
          <ArrowLeft className="h-4 w-4" />
          All certificates
        </Link>

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-start gap-3">
          {cert.category && (
            <span className="rounded-full border border-(--border) bg-(--card) px-3 py-1 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
              {cert.category}
            </span>
          )}
          <ValidityStatus issueDate={cert.issueDate} expiryDate={cert.expiryDate} />
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-(--text) md:text-5xl lg:text-[3.25rem]">
          {cert.title}
        </h1>
        <p className="mt-3 text-xl text-(--text-muted)">
          Issued by <span className="font-semibold text-(--text)">{cert.issuer}</span>
        </p>

        {/* Single-column layout */}
        <div className="mt-10 flex flex-col gap-10">

          {/* ── Left: image + tabs ── */}
          <div className="min-w-0">
            {/* Certificate image */}
            {cert.certificateImage ? (
              <div className="group relative overflow-hidden rounded-2xl border border-(--border)">
                <AppImage
                  src={cert.certificateImage}
                  alt={cert.title}
                  wrapperClassName="w-full"
                  className="h-full w-full object-cover transition duration-300 group-hover:brightness-75"
                  eager
                />
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-label="View full size"
                >
                  <span className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <ZoomIn className="h-4 w-4" />
                    View full size
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-2xl border border-(--border) bg-(--card)">
                <Award className="h-20 w-20 text-(--text-muted)" style={{ opacity: 0.2 }} />
              </div>
            )}

            {/* Tabs */}
            {(cert.description || hasSkills) && (
              <div className="mt-8">
                {tabs.length > 1 && (
                  <div className="mb-6 flex gap-1 rounded-xl border border-(--border) bg-(--card) p-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
                          activeTab === tab.id
                            ? "bg-(--background) text-(--text) shadow-sm"
                            : "text-(--text-muted) hover:text-(--text)"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === "overview" && cert.description && (
                  <div>
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
                      About this Certificate
                    </h2>
                    <p className="leading-7 text-(--text)">{cert.description}</p>
                  </div>
                )}

                {(activeTab === "skills" || tabs.length === 1) && hasSkills && (
                  <div>
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
                      Skills Covered
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="cursor-default rounded-lg border border-(--border) bg-(--card) px-3 py-1.5 text-sm text-(--text) transition hover:border-(--text-muted) hover:bg-(--card-solid)"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Back (mobile bottom) */}
            <div className="mt-12 border-t border-(--border) pt-8">
              <Link
                to="/certificates"
                className="inline-flex items-center gap-2 text-sm text-(--text-muted) transition hover:text-(--text)"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all certificates
              </Link>
            </div>
          </div>

          {/* ── Credential meta ── */}
          <aside className="mt-8">
            <div className="space-y-4">

              {/* Credential details */}
              <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-(--text-muted)">
                  Credential Details
                </p>
                <div>
                  <MetaRow icon={Calendar} label="Issued">
                    {formatDate(cert.issueDate)}
                  </MetaRow>
                  {cert.expiryDate && (
                    <MetaRow icon={Clock} label="Expires">
                      {formatDate(cert.expiryDate)}
                    </MetaRow>
                  )}
                  {cert.grade && (
                    <MetaRow icon={CheckCircle} label="Grade / Score">
                      {cert.grade}
                    </MetaRow>
                  )}
                  {cert.credentialId && (
                    <MetaRow icon={Award} label="Credential ID">
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="truncate font-mono text-sm text-(--text)">{cert.credentialId}</span>
                        <button
                          onClick={copyCredentialId}
                          className="shrink-0 rounded-md p-1 text-(--text-muted) transition hover:text-(--text)"
                          title="Copy ID"
                        >
                          {copiedId ? (
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </MetaRow>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="grid gap-2">
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-(--text) px-4 py-3 text-sm font-semibold text-(--background) transition hover:opacity-85"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Verify Certificate
                  </a>
                )}
                {cert.credentialId && (
                  <button
                    onClick={copyCredentialId}
                    className="flex items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--card) px-4 py-3 text-sm font-medium text-(--text-muted) transition hover:text-(--text)"
                  >
                    {copiedId ? (
                      <><CheckCircle className="h-4 w-4 text-emerald-400" /> Copied!</>
                    ) : (
                      <><Copy className="h-4 w-4" /> Copy Credential ID</>
                    )}
                  </button>
                )}
              </div>

              {/* Skills (sidebar preview if tab is elsewhere) */}
              {hasSkills && activeTab === "overview" && tabs.length > 1 && (
                <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-(--text-muted)">
                    Skills Covered
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.slice(0, 8).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-(--border) px-2.5 py-1 text-xs text-(--text-muted)"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 8 && (
                      <button
                        onClick={() => setActiveTab("skills")}
                        className="rounded-md border border-(--border) px-2.5 py-1 text-xs text-(--text-muted) transition hover:text-(--text)"
                      >
                        +{cert.skills.length - 8} more
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Back (sidebar) */}
              <Link
                to="/certificates"
                className="flex items-center gap-2 rounded-2xl border border-(--border) bg-(--card) px-5 py-4 text-sm text-(--text-muted) transition hover:text-(--text)"
              >
                <ArrowLeft className="h-4 w-4" />
                All certificates
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
