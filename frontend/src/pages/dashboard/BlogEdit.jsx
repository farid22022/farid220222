import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import Loader from "../../components/common/Loader";
import BlogForm from "../../components/dashboard/BlogForm";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { api.get("/blogs").then(({ data }) => setItem(data.find((entry) => entry._id === id))); }, [id]);
  async function submit(values) {
    setLoading(true);
    try {
      await api.put(`/blogs/${id}`, values);
      toast.success("Blog updated");
      navigate("/admin/blogs");
    } finally {
      setLoading(false);
    }
  }
  if (!item) return <Loader label="Loading blog" />;
  return <BlogForm initialValues={item} onSubmit={submit} loading={loading} />;
}
