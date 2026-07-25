import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/dashboard/BlogForm";
import { useCreateContent } from "../../hooks/useContent";

export default function BlogAdd() {
  const navigate = useNavigate();
  const mutation = useCreateContent("blogs");

  async function submit(values) {
    try {
      await mutation.mutateAsync(values);
      toast.success("Blog created");
      navigate("/admin/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create blog");
    }
  }

  return <BlogForm onSubmit={submit} loading={mutation.isPending} />;
}
