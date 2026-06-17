import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import ConfirmModal from "../../components/common/ConfirmModal";
import DataTable from "../../components/dashboard/DataTable";

export default function CertificatesManage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const load = () => api.get("/certificates").then(({ data }) => setItems(data));
  useEffect(() => { load(); }, []);
  async function remove() {
    await api.delete(`/certificates/${target._id}`);
    toast.success("Certificate deleted");
    setTarget(null);
    load();
  }
  return (
    <>
      <DataTable title="Manage Certificates" addHref="/admin/certificates/add" items={items} search={search} setSearch={setSearch} onDelete={setTarget} columns={[
        { key: "title", label: "Title" },
        { key: "issuer", label: "Issuer" },
        { key: "category", label: "Category" },
        { key: "featured", label: "Featured", render: (item) => item.featured ? "Yes" : "No" }
      ]} />
      <ConfirmModal open={Boolean(target)} title="Delete certificate?" text="This certificate will be permanently removed." onCancel={() => setTarget(null)} onConfirm={remove} />
    </>
  );
}
