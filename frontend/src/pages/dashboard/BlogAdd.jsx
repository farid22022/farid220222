import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import BlogForm from "../../components/dashboard/BlogForm";

export default function BlogAdd() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(values) {
    setLoading(true);
    try {
      await api.post("/blogs", values);
      toast.success("Blog created");
      navigate("/admin/blogs");
    } finally {
      setLoading(false);
    }
  }
  return <BlogForm onSubmit={submit} loading={loading} />;
}
