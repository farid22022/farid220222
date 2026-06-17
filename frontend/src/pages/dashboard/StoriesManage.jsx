import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import ConfirmModal from "../../components/common/ConfirmModal";
import DataTable from "../../components/dashboard/DataTable";

export default function StoriesManage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const load = () => api.get("/stories").then(({ data }) => setItems(data));
  useEffect(() => { load(); }, []);
  async function remove() {
    await api.delete(`/stories/${target._id}`);
    toast.success("Story deleted");
    setTarget(null);
    load();
  }
  return (
    <>
      <DataTable title="Manage Stories" addHref="/admin/stories/add" items={items} search={search} setSearch={setSearch} onDelete={setTarget} columns={[
        { key: "title", label: "Title" },
        { key: "type", label: "Type" },
        { key: "date", label: "Date", render: (item) => new Date(item.date).toLocaleDateString() },
        { key: "featured", label: "Featured", render: (item) => item.featured ? "Yes" : "No" }
      ]} />
      <ConfirmModal open={Boolean(target)} title="Delete story?" text="This story will be permanently removed." onCancel={() => setTarget(null)} onConfirm={remove} />
    </>
  );
}
