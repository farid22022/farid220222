import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormShell from "./FormShell";
import { Field, inputClass } from "./Field";
import CustomFieldsBuilder from "./CustomFieldsBuilder";
import ImageUploader from "./ImageUploader";
import MultiImageUploader from "./MultiImageUploader";

export default function StoryForm({ initialValues, onSubmit, loading }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      gallery: [],
      customFields: [],
      date: "",
      type: "Milestone",
      featured: false
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        date: initialValues.date?.slice(0, 10),
        gallery: initialValues.gallery || [],
        customFields: initialValues.customFields || []
      });
    }
  }, [initialValues, reset]);

  return (
    <FormShell title={initialValues ? "Edit Story" : "Add Story"} onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <Field label="Title"><input {...register("title", { required: true })} className={inputClass} /></Field>
      <Field label="Description"><textarea {...register("description", { required: true })} rows="5" className={inputClass} /></Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Date"><input type="date" {...register("date", { required: true })} className={inputClass} /></Field>
        <Field label="Type"><input {...register("type")} className={inputClass} /></Field>
      </div>
      <ImageUploader label="Story image" value={watch("image")} onChange={(url) => setValue("image", url)} />
      <MultiImageUploader label="Story gallery images" value={watch("gallery")} onChange={(images) => setValue("gallery", images)} field="storyGallery" />
      <CustomFieldsBuilder value={watch("customFields")} onChange={(fields) => setValue("customFields", fields)} />
      <label className="text-sm text-white/65"><input type="checkbox" {...register("featured")} className="mr-2" />Featured</label>
    </FormShell>
  );
}
