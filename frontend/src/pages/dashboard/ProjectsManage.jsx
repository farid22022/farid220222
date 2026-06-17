import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import ConfirmModal from "../../components/common/ConfirmModal";
import DataTable from "../../components/dashboard/DataTable";

export default function ProjectsManage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const load = () => api.get("/projects").then(({ data }) => setItems(data));
  useEffect(() => { load(); }, []);
  async function remove() {
    await api.delete(`/projects/${target._id}`);
    toast.success("Project deleted");
    setTarget(null);
    load();
  }
  return (
    <>
      <DataTable title="Manage Projects" addHref="/admin/projects/add" items={items} search={search} setSearch={setSearch} onDelete={setTarget} columns={[
        { key: "title", label: "Title" },
        { key: "projectType", label: "Type" },
        { key: "aiDomain", label: "AI / ML Domain", render: (item) => item.aiDomain || "-" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        { key: "featured", label: "Featured", render: (item) => item.featured ? "Yes" : "No" }
      ]} />
      <ConfirmModal open={Boolean(target)} title="Delete project?" text="This project will be permanently removed." onCancel={() => setTarget(null)} onConfirm={remove} />
    </>
  );
}
