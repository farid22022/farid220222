import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormShell from "./FormShell";
import ImageUploader from "./ImageUploader";

export default function LogoForm({ theme, onSubmit, loading }) {
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: { siteName: theme.siteName || "", logo: theme.logo || "", favicon: theme.favicon || "" }
  });

  useEffect(() => {
    reset({ siteName: theme.siteName || "", logo: theme.logo || "", favicon: theme.favicon || "" });
  }, [theme.siteName, theme.logo, theme.favicon, reset]);

  return (
    <FormShell title="Site Identity" onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <label className="grid gap-1.5 text-sm text-white/70">
        Site name
        <input
          {...register("siteName")}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:border-white/30"
        />
      </label>
      <ImageUploader label="Logo" value={watch("logo")} onChange={(url) => setValue("logo", url)} field="logo" />
      <ImageUploader label="Favicon" value={watch("favicon")} onChange={(url) => setValue("favicon", url)} field="favicon" />
    </FormShell>
  );
}
