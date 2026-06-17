import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import ProjectForm from "../../components/dashboard/ProjectForm";

export default function ProjectAdd() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(values) {
    setLoading(true);
    try {
      await api.post("/projects", values);
      toast.success("Project created");
      navigate("/admin/projects");
    } finally {
      setLoading(false);
    }
  }
  return <ProjectForm onSubmit={submit} loading={loading} />;
}
