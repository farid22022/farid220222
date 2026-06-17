import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import LogoForm from "../../components/dashboard/LogoForm";
import { useTheme } from "../../context/ThemeContext";

export default function LogoSettings() {
  const { theme, setTheme, refreshTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  async function submit(values) {
    setLoading(true);
    try {
      const { data } = await api.put("/theme", { ...theme, logo: values.logo });
      setTheme(data);
      toast.success("Logo updated");
      refreshTheme();
    } finally {
      setLoading(false);
    }
  }

  return <LogoForm theme={theme} onSubmit={submit} loading={loading} />;
}
