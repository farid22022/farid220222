import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CertificateForm from "../../components/dashboard/CertificateForm";
import { useCreateContent } from "../../hooks/useContent";

export default function CertificateAdd() {
  const navigate = useNavigate();
  const mutation = useCreateContent("certificates");

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Certificate created");
      navigate("/admin/certificates");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create certificate");
    }
  }

  return <CertificateForm onSubmit={submit} loading={mutation.isPending} />;
}
