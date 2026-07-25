import ContactSection from "../../components/home/ContactSection";
import Seo from "../../components/common/Seo";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Farid Hossen Rehad — Let's Build Something"
        description="Get in touch with Md. Farid Hossen Rehad (Farid) for full-stack web development, AI/ML integration, dashboards, and API projects. Usually replies within 24 hours."
        path="/contact"
      />
      <ContactSection className="mx-auto max-w-5xl px-4 py-24" />
    </>
  );
}
