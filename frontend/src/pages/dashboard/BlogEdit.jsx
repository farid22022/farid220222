import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import BlogForm from "../../components/dashboard/BlogForm";
import { useContentById, useUpdateContent } from "../../hooks/useContent";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, isError, refetch } = useContentById("blogs", id);
  const mutation = useUpdateContent("blogs", id);

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Blog updated");
      navigate("/admin/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update blog");
    }
  }

  if (isLoading) return <Loader label="Loading blog" />;
  if (isError) return <ErrorState onRetry={refetch} />;
  return <BlogForm initialValues={item} onSubmit={submit} loading={mutation.isPending} />;
}
