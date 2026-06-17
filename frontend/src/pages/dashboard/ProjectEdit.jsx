import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import Loader from "../../components/common/Loader";
import ProjectForm from "../../components/dashboard/ProjectForm";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { api.get("/projects").then(({ data }) => setItem(data.find((entry) => entry._id === id))); }, [id]);
  async function submit(values) {
    setLoading(true);
    try {
      await api.put(`/projects/${id}`, values);
      toast.success("Project updated");
      navigate("/admin/projects");
    } finally {
      setLoading(false);
    }
  }
  if (!item) return <Loader label="Loading project" />;
  return <ProjectForm initialValues={item} onSubmit={submit} loading={loading} />;
}
