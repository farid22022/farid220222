import { useState } from "react";
import { BriefcaseBusiness, GitBranch, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import toast from "react-hot-toast";
import SectionReveal from "../common/SectionReveal";

const EMAIL = "mdfaridhossenrehad@gmail.com";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    note: "Best for project inquiries"
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/mdfaridhossenrehad",
    href: "https://github.com/mdfaridhossenrehad",
    note: "Open source & code samples"
  },
  {
    icon: BriefcaseBusiness,
    label: "LinkedIn",
    value: "linkedin.com/in/mdfaridhossenrehad",
    href: "https://linkedin.com/in/mdfaridhossenrehad",
    note: "Professional network"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Khulna, Bangladesh",
    href: null,
    note: "Available for remote work globally"
  }
];

const services = [
  "Full Stack Web Applications",
  "Admin Dashboards & CMS",
  "REST API Development",
  "AI/ML Model Integration",
  "Performance Optimization",
  "Code Review & Consulting"
];

export default function ContactSection({ heading = true, className = "mx-auto max-w-5xl px-4 py-20" }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const subject = encodeURIComponent(form.subject || `Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      toast.success("Email client opened! Send the message from there.");
      setSubmitting(false);
    }, 800);
  }

  return (
    <SectionReveal className={className}>
      {heading ? (
        <>
          <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Contact</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">Have an idea worth shipping?</h2>
          <p className="mt-5 max-w-2xl text-lg text-(--text-muted)">
            Whether it's a full-stack project, an AI experiment, or just a conversation about tech — I'm happy to
            connect. I typically respond within 24 hours.
          </p>
        </>
      ) : null}

      <div className="mt-10 flex flex-col gap-10">
        {/* Contact info */}
        <div>
          <div className="grid gap-4">
            {contactMethods.map(({ icon: Icon, label, value, href, note }) => (
              <div key={label} className="glass rounded-lg p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-(--border) bg-(--card)">
                    <Icon className="h-5 w-5 text-(--accent)" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-(--text-muted)">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="mt-0.5 block truncate text-sm font-medium text-(--text) hover:text-(--accent)"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-(--text)">{value}</p>
                    )}
                    <p className="mt-1 text-xs text-(--text-muted)">{note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 glass rounded-lg p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-(--text-muted)">
              <MessageSquare className="h-4 w-4 text-(--accent)" />
              What I can help with
            </p>
            <ul className="mt-4 grid gap-2">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-(--text-muted)">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="glass rounded-lg p-6">
          <h3 className="text-xl font-semibold">Send a message</h3>
          <p className="mt-1 text-sm text-(--text-muted)">I'll reply within 24 hours.</p>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-(--text-muted)">
                  Name <span className="text-(--accent)">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="contact-input"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-(--text-muted)">
                  Email <span className="text-(--accent)">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="contact-input"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-(--text-muted)">Subject</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, etc."
                className="contact-input"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-(--text-muted)">
                Message <span className="text-(--accent)">*</span>
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea..."
                rows={6}
                className="contact-input resize-none"
                required
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--text) py-3 text-sm font-semibold text-(--background) transition hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Opening email…" : "Send Message"}
              <Send className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-(--text-muted)">
              This opens your email client pre-filled with your message.
            </p>
          </div>
        </form>
      </div>
    </SectionReveal>
  );
}
