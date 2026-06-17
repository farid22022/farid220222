import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormShell from "./FormShell";
import ImageUploader from "./ImageUploader";

export default function LogoForm({ theme, onSubmit, loading }) {
  const { handleSubmit, watch, setValue, reset } = useForm({ defaultValues: { logo: theme.logo || "" } });

  useEffect(() => {
    reset({ logo: theme.logo || "" });
  }, [theme.logo, reset]);

  return (
    <FormShell title="Logo Settings" onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <ImageUploader label="Logo" value={watch("logo")} onChange={(url) => setValue("logo", url)} field="logo" />
    </FormShell>
  );
}
