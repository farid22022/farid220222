import toast from "react-hot-toast";
import LogoForm from "../../components/dashboard/LogoForm";
import { useTheme } from "../../context/ThemeContext";

export default function LogoSettings() {
  const { theme, saveTheme, saving } = useTheme();

  async function submit(values) {
    try {
      await saveTheme({ ...theme, siteName: values.siteName, logo: values.logo, favicon: values.favicon });
      toast.success("Site identity updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update site identity");
    }
  }

  return <LogoForm theme={theme} onSubmit={submit} loading={saving} />;
}
