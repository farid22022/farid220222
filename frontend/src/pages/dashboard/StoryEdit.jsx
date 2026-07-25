import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import StoryForm from "../../components/dashboard/StoryForm";
import { useContentById, useUpdateContent } from "../../hooks/useContent";

export default function StoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, isError, refetch } = useContentById("stories", id);
  const mutation = useUpdateContent("stories", id);

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Story updated");
      navigate("/admin/stories");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update story");
    }
  }

  if (isLoading) return <Loader label="Loading story" />;
  if (isError) return <ErrorState onRetry={refetch} />;
  return <StoryForm initialValues={item} onSubmit={submit} loading={mutation.isPending} />;
}
