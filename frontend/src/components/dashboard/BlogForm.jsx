import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormShell from "./FormShell";
import { Field, inputClass } from "./Field";
import CustomFieldsBuilder from "./CustomFieldsBuilder";
import ImageUploader from "./ImageUploader";
import MultiImageUploader from "./MultiImageUploader";

export default function BlogForm({ initialValues, onSubmit, loading }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      gallery: [],
      customFields: [],
      category: "Engineering",
      tags: "",
      published: true,
      featured: false
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        tags: initialValues.tags?.join(", ") || "",
        gallery: initialValues.gallery || [],
        customFields: initialValues.customFields || []
      });
    }
  }, [initialValues, reset]);

  return (
    <FormShell title={initialValues ? "Edit Blog" : "Add Blog"} onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <Field label="Title"><input {...register("title", { required: true })} className={inputClass} /></Field>
      <Field label="Excerpt"><textarea {...register("excerpt", { required: true })} rows="3" className={inputClass} /></Field>
      <Field label="Content"><textarea {...register("content", { required: true })} rows="10" className={inputClass} /></Field>
      <ImageUploader label="Cover image" value={watch("coverImage")} onChange={(url) => setValue("coverImage", url)} field="coverImage" />
      <MultiImageUploader label="Blog gallery images" value={watch("gallery")} onChange={(images) => setValue("gallery", images)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Category"><input {...register("category")} className={inputClass} /></Field>
        <Field label="Tags"><input {...register("tags")} className={inputClass} placeholder="AI, React, API" /></Field>
      </div>
      <CustomFieldsBuilder value={watch("customFields")} onChange={(fields) => setValue("customFields", fields)} />
      <div className="flex gap-4 text-sm text-white/65">
        <label><input type="checkbox" {...register("published")} className="mr-2" />Published</label>
        <label><input type="checkbox" {...register("featured")} className="mr-2" />Featured</label>
      </div>
    </FormShell>
  );
}
