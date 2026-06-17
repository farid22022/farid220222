import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormShell from "./FormShell";
import { Field, inputClass } from "./Field";
import ImageUploader from "./ImageUploader";

export default function CertificateForm({ initialValues, onSubmit, loading }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: { title: "", issuer: "", issueDate: "", credentialUrl: "", certificateImage: "", category: "Development", featured: false }
  });

  useEffect(() => {
    if (initialValues) reset({ ...initialValues, issueDate: initialValues.issueDate?.slice(0, 10) });
  }, [initialValues, reset]);

  return (
    <FormShell title={initialValues ? "Edit Certificate" : "Add Certificate"} onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title"><input {...register("title", { required: true })} className={inputClass} /></Field>
        <Field label="Issuer"><input {...register("issuer", { required: true })} className={inputClass} /></Field>
        <Field label="Issue date"><input type="date" {...register("issueDate", { required: true })} className={inputClass} /></Field>
        <Field label="Category"><input {...register("category")} className={inputClass} /></Field>
      </div>
      <Field label="Credential URL"><input {...register("credentialUrl")} className={inputClass} /></Field>
      <ImageUploader label="Certificate image" value={watch("certificateImage")} onChange={(url) => setValue("certificateImage", url)} field="certificateImage" />
      <label className="text-sm text-white/65"><input type="checkbox" {...register("featured")} className="mr-2" />Featured</label>
    </FormShell>
  );
}
