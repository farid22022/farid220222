import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormShell from "./FormShell";
import { Field, inputClass } from "./Field";
import ImageUploader from "./ImageUploader";

export default function CertificateForm({ initialValues, onSubmit, loading }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      description: "",
      skills: "",
      grade: "",
      certificateImage: "",
      category: "Development",
      featured: false
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        issueDate: initialValues.issueDate?.slice(0, 10) ?? "",
        expiryDate: initialValues.expiryDate?.slice(0, 10) ?? "",
        skills: Array.isArray(initialValues.skills) ? initialValues.skills.join(", ") : (initialValues.skills || "")
      });
    }
  }, [initialValues, reset]);

  return (
    <FormShell title={initialValues ? "Edit Certificate" : "Add Certificate"} onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title">
          <input {...register("title", { required: true })} className={inputClass} />
        </Field>
        <Field label="Issuer / Organization">
          <input {...register("issuer", { required: true })} className={inputClass} />
        </Field>
        <Field label="Issue date">
          <input type="date" {...register("issueDate", { required: true })} className={inputClass} />
        </Field>
        <Field label="Expiry date" hint="Leave blank for no expiry">
          <input type="date" {...register("expiryDate")} className={inputClass} />
        </Field>
        <Field label="Category">
          <input {...register("category")} className={inputClass} />
        </Field>
        <Field label="Grade / Score" hint="e.g. 95%, Pass with Distinction">
          <input {...register("grade")} className={inputClass} placeholder="e.g. 95%" />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Credential ID" hint="The ID number printed on the certificate">
          <input {...register("credentialId")} className={inputClass} placeholder="e.g. UC-XXXXXXXX" />
        </Field>
        <Field label="Verify URL">
          <input {...register("credentialUrl")} className={inputClass} placeholder="https://..." />
        </Field>
      </div>

      <Field label="Description" hint="What this certificate covers">
        <textarea
          {...register("description")}
          rows={3}
          className={inputClass}
          placeholder="Brief description of the course or certification…"
        />
      </Field>

      <Field label="Skills covered" hint="Comma-separated, e.g. Python, Machine Learning, TensorFlow">
        <input {...register("skills")} className={inputClass} placeholder="React, Node.js, MongoDB" />
      </Field>

      <ImageUploader
        label="Certificate image"
        value={watch("certificateImage")}
        onChange={(url) => setValue("certificateImage", url)}
        field="certificateImage"
      />

      <label className="text-sm text-white/65">
        <input type="checkbox" {...register("featured")} className="mr-2" />
        Featured
      </label>
    </FormShell>
  );
}
