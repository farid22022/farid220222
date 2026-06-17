import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import Loader from "../../components/common/Loader";
import StoryForm from "../../components/dashboard/StoryForm";

export default function StoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { api.get("/stories").then(({ data }) => setItem(data.find((entry) => entry._id === id))); }, [id]);
  async function submit(values) {
    setLoading(true);
    try {
      await api.put(`/stories/${id}`, values);
      toast.success("Story updated");
      navigate("/admin/stories");
    } finally {
      setLoading(false);
    }
  }
  if (!item) return <Loader label="Loading story" />;
  return <StoryForm initialValues={item} onSubmit={submit} loading={loading} />;
}
