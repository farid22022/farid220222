import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import ConfirmModal from "../../components/common/ConfirmModal";
import DataTable from "../../components/dashboard/DataTable";

export default function BlogsManage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const load = () => api.get("/blogs").then(({ data }) => setItems(data));
  useEffect(() => { load(); }, []);
  async function remove() {
    await api.delete(`/blogs/${target._id}`);
    toast.success("Blog deleted");
    setTarget(null);
    load();
  }
  return (
    <>
      <DataTable title="Manage Blogs" addHref="/admin/blogs/add" items={items} search={search} setSearch={setSearch} onDelete={setTarget} columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "published", label: "Published", render: (item) => item.published ? "Yes" : "No" },
        { key: "featured", label: "Featured", render: (item) => item.featured ? "Yes" : "No" }
      ]} />
      <ConfirmModal open={Boolean(target)} title="Delete blog?" text="This blog will be permanently removed." onCancel={() => setTarget(null)} onConfirm={remove} />
    </>
  );
}
