import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import CertificateForm from "../../components/dashboard/CertificateForm";

export default function CertificateAdd() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(values) {
    setLoading(true);
    try {
      await api.post("/certificates", values);
      toast.success("Certificate created");
      navigate("/admin/certificates");
    } finally {
      setLoading(false);
    }
  }
  return <CertificateForm onSubmit={submit} loading={loading} />;
}
