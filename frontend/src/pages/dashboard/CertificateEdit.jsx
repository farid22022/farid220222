import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import Loader from "../../components/common/Loader";
import CertificateForm from "../../components/dashboard/CertificateForm";

export default function CertificateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { api.get("/certificates").then(({ data }) => setItem(data.find((entry) => entry._id === id))); }, [id]);
  async function submit(values) {
    setLoading(true);
    try {
      await api.put(`/certificates/${id}`, values);
      toast.success("Certificate updated");
      navigate("/admin/certificates");
    } finally {
      setLoading(false);
    }
  }
  if (!item) return <Loader label="Loading certificate" />;
  return <CertificateForm initialValues={item} onSubmit={submit} loading={loading} />;
}
