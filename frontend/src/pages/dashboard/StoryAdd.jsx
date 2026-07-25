import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StoryForm from "../../components/dashboard/StoryForm";
import { useCreateContent } from "../../hooks/useContent";

export default function StoryAdd() {
  const navigate = useNavigate();
  const mutation = useCreateContent("stories");

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Story created");
      navigate("/admin/stories");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create story");
    }
  }

  return <StoryForm onSubmit={submit} loading={mutation.isPending} />;
}
