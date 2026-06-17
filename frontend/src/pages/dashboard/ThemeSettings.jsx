import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import ThemeForm from "../../components/dashboard/ThemeForm";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeSettings() {
  const { theme, setTheme, refreshTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  async function submit(values) {
    setLoading(true);
    try {
      const { data } = await api.put("/theme", values);
      setTheme(data);
      toast.success("Theme updated");
      refreshTheme();
    } finally {
      setLoading(false);
    }
  }

  return <ThemeForm initialValues={theme} onPreview={setTheme} onSubmit={submit} loading={loading} />;
}
