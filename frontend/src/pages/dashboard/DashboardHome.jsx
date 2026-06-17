import { Award, BookOpen, FolderKanban, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import StatCard from "../../components/dashboard/StatCard";

export default function DashboardHome() {
  const [data, setData] = useState({ projects: [], blogs: [], certificates: [], stories: [] });

  useEffect(() => {
    Promise.allSettled([api.get("/projects"), api.get("/blogs"), api.get("/certificates"), api.get("/stories")]).then(
      ([projects, blogs, certificates, stories]) => {
        setData({
          projects: projects.value?.data || [],
          blogs: blogs.value?.data || [],
          certificates: certificates.value?.data || [],
          stories: stories.value?.data || []
        });
      }
    );
  }, []);

  const sections = [
    ["Recent projects", data.projects],
    ["Recent blogs", data.blogs],
    ["Recent certificates", data.certificates],
    ["Recent stories", data.stories]
  ];

  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/35">Dashboard</p>
        <h1 className="mt-2 text-3xl font-black">Overview</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Projects" value={data.projects.length} icon={FolderKanban} />
        <StatCard label="Blogs" value={data.blogs.length} icon={BookOpen} />
        <StatCard label="Certificates" value={data.certificates.length} icon={Award} />
        <StatCard label="Stories" value={data.stories.length} icon={Sparkles} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map(([title, items]) => (
          <div key={title} className="glass rounded-lg p-5">
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            <div className="grid gap-3">
              {items.slice(0, 4).map((item) => (
                <div key={item._id} className="rounded-md border border-white/10 p-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-white/45">{item.category || item.type || item.issuer}</p>
                </div>
              ))}
              {items.length === 0 ? <p className="text-sm text-white/45">No records yet.</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
