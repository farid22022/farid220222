import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/dashboard/ProjectForm";
import { useCreateContent } from "../../hooks/useContent";

export default function ProjectAdd() {
  const navigate = useNavigate();
  const mutation = useCreateContent("projects");

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Project created");
      navigate("/admin/projects");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create project");
    }
  }

  return <ProjectForm onSubmit={submit} loading={mutation.isPending} />;
}
