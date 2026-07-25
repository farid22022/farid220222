import { Check, Clipboard, Clock, Copy, KeyRound, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";
import api from "../../api/axiosInstance";

function formatExpiry(expiresAt) {
  if (!expiresAt) return "";
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric"
  }).format(new Date(expiresAt));
}

export default function TextShare() {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [createdShare, setCreatedShare] = useState(null);
  const [lookupCode, setLookupCode] = useState("");
  const [sharedText, setSharedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const remaining = useMemo(() => Math.max(0, 12000 - text.length), [text]);

  async function handleCreate(event) {
    event.preventDefault();

    if (!text.trim()) {
      toast.error("Write something to share first.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/text-shares", { text });
      setCreatedShare(data);
      setCode(data.code);
      toast.success("OTP code created for 1 hour.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create OTP code.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLookup(event) {
    event.preventDefault();

    if (!lookupCode.trim()) {
      toast.error("Enter an OTP code.");
      return;
    }

    setLookupLoading(true);
    setSharedText("");
    try {
      const { data } = await api.get(`/text-shares/${lookupCode}`);
      setSharedText(data.text);
      toast.success("Shared text unlocked.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not find that OTP code.");
    } finally {
      setLookupLoading(false);
    }
  }

  async function copyValue(value, label) {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied.`);
    } catch {
      toast.error("Copy failed. Select the text manually.");
    }
  }

  return (
    <SectionReveal className="mx-auto max-w-6xl px-4 py-24">
      <Seo
        title="Text Share — Temporary OTP Text Sharing | Farid Hossen Rehad"
        description="Share text securely with a 1-hour OTP code. A small utility built by Md. Farid Hossen Rehad (Farid)."
        path="/share-text"
      />
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Text Share</p>
        <h1 className="mt-4 text-5xl font-black md:text-7xl">Share text with a 1-hour OTP.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-(--text-muted)">
          Drop in text, send the code, and the receiver can unlock it for the next hour.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-5">
        <form onSubmit={handleCreate} className="glass rounded-lg p-5 md:p-6">
          <div className="flex items-center gap-3">
            <Clipboard className="h-6 w-6 text-(--accent)" />
            <div>
              <h2 className="text-2xl font-semibold">Create OTP</h2>
              <p className="text-sm text-(--text-muted)">Available to anyone with the code for 1 hour.</p>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value.slice(0, 12000))}
            rows={12}
            placeholder="Paste or write the text you want to share..."
            className="mt-6 w-full resize-y rounded-lg border border-(--border) bg-(--card) p-4 text-(--text) outline-none transition placeholder:text-(--text-muted) focus:border-(--accent)"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-(--text-muted)">
            <span>{remaining} characters left</span>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-(--text) px-4 py-2 font-semibold text-(--background) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? "Creating..." : "Create code"}
            </button>
          </div>

          {createdShare && (
            <div className="mt-5 rounded-lg border border-(--border) bg-(--card) p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-(--text-muted)">Your OTP code</p>
                  <p className="mt-1 font-mono text-4xl font-black tracking-[0.22em] text-(--text)">{code}</p>
                </div>
                <button
                  type="button"
                  onClick={() => copyValue(code, "OTP code")}
                  className="inline-flex items-center gap-2 rounded-md border border-(--border) px-3 py-2 text-sm text-(--text-muted) transition hover:bg-(--card-solid)"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-(--text-muted)">
                <Clock className="h-4 w-4" />
                Expires at {formatExpiry(createdShare.expiresAt)}
              </p>
            </div>
          )}
        </form>

        <div className="grid content-start gap-5">
          <form onSubmit={handleLookup} className="glass rounded-lg p-5 md:p-6">
            <div className="flex items-center gap-3">
              <KeyRound className="h-6 w-6 text-(--accent)" />
              <div>
                <h2 className="text-2xl font-semibold">Open Shared Text</h2>
                <p className="text-sm text-(--text-muted)">Enter the OTP before it expires.</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input
                value={lookupCode}
                onChange={(event) => setLookupCode(event.target.value.replace(/[^a-z0-9]/gi, "").slice(0, 12).toUpperCase())}
                placeholder="123456"
                className="min-w-0 flex-1 rounded-lg border border-(--border) bg-(--card) px-4 py-3 font-mono text-lg tracking-[0.18em] text-(--text) outline-none placeholder:text-(--text-muted) focus:border-(--accent)"
              />
              <button
                type="submit"
                disabled={lookupLoading}
                className="grid h-12 w-12 place-items-center rounded-md bg-(--text) text-(--background) transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Open shared text"
              >
                {lookupLoading ? <Clock className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
              </button>
            </div>
          </form>

          {sharedText && (
            <div className="glass rounded-lg p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-(--accent)" />
                  <h2 className="text-2xl font-semibold">Unlocked</h2>
                </div>
                <button
                  type="button"
                  onClick={() => copyValue(sharedText, "Text")}
                  className="grid h-10 w-10 place-items-center rounded-md border border-(--border) text-(--text-muted) transition hover:bg-(--card-solid)"
                  aria-label="Copy unlocked text"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <pre className="mt-5 max-h-105 whitespace-pre-wrap wrap-break-word rounded-lg border border-(--border) bg-(--card) p-4 text-sm leading-7 text-(--text-muted)">
                {sharedText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </SectionReveal>
  );
}
