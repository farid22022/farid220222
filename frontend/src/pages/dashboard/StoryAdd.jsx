import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import StoryForm from "../../components/dashboard/StoryForm";

export default function StoryAdd() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(values) {
    setLoading(true);
    try {
      await api.post("/stories", values);
      toast.success("Story created");
      navigate("/admin/stories");
    } finally {
      setLoading(false);
    }
  }
  return <StoryForm onSubmit={submit} loading={loading} />;
}
