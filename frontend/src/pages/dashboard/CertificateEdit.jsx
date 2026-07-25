import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import CertificateForm from "../../components/dashboard/CertificateForm";
import { useContentById, useUpdateContent } from "../../hooks/useContent";

export default function CertificateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, isError, refetch } = useContentById("certificates", id);
  const mutation = useUpdateContent("certificates", id);

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Certificate updated");
      navigate("/admin/certificates");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update certificate");
    }
  }

  if (isLoading) return <Loader label="Loading certificate" />;
  if (isError) return <ErrorState onRetry={refetch} />;
  return <CertificateForm initialValues={item} onSubmit={submit} loading={mutation.isPending} />;
}
