import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import ProjectForm from "../../components/dashboard/ProjectForm";
import { useContentById, useUpdateContent } from "../../hooks/useContent";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, isError, refetch } = useContentById("projects", id);
  const mutation = useUpdateContent("projects", id);

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Project updated");
      navigate("/admin/projects");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update project");
    }
  }

  if (isLoading) return <Loader label="Loading project" />;
  if (isError) return <ErrorState onRetry={refetch} />;
  return <ProjectForm initialValues={item} onSubmit={submit} loading={mutation.isPending} />;
}
