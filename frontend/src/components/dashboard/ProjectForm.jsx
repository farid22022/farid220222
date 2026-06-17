import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormShell from "./FormShell";
import { Field, inputClass } from "./Field";
import CustomFieldsBuilder from "./CustomFieldsBuilder";
import ImageUploader from "./ImageUploader";
import MultiImageUploader from "./MultiImageUploader";

export default function ProjectForm({ initialValues, onSubmit, loading }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      image: "",
      gallery: [],
      customFields: [],
      technologies: "",
      category: "Web App",
      projectType: "Full Stack",
      aiDomain: "",
      problemStatement: "",
      keyFeatures: "",
      mlTechniques: "",
      modelArchitectures: "",
      datasetName: "",
      datasetUrl: "",
      notebookUrl: "",
      modelUrl: "",
      paperUrl: "",
      demoVideoUrl: "",
      accuracy: "",
      metrics: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      status: "published"
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        technologies: initialValues.technologies?.join(", ") || "",
        gallery: initialValues.gallery || [],
        customFields: initialValues.customFields || [],
        keyFeatures: initialValues.keyFeatures?.join(", ") || "",
        mlTechniques: initialValues.mlTechniques?.join(", ") || "",
        modelArchitectures: initialValues.modelArchitectures?.join(", ") || ""
      });
    }
  }, [initialValues, reset]);

  return (
    <FormShell title={initialValues ? "Edit Project" : "Add Project"} onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <Field label="Title"><input {...register("title", { required: true })} className={inputClass} /></Field>
      <Field label="Short description"><input {...register("shortDescription", { required: true })} className={inputClass} /></Field>
      <Field label="Description"><textarea {...register("description", { required: true })} rows="6" className={inputClass} /></Field>
      <ImageUploader label="Project image" value={watch("image")} onChange={(url) => setValue("image", url)} />
      <MultiImageUploader label="Project gallery images" value={watch("gallery")} onChange={(images) => setValue("gallery", images)} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Technologies"><input {...register("technologies")} className={inputClass} placeholder="React, Node.js" /></Field>
        <Field label="Category"><input {...register("category")} className={inputClass} /></Field>
        <Field label="Project type">
          <select {...register("projectType")} className={inputClass}>
            <option>Full Stack</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Machine Learning</option>
            <option>Deep Learning</option>
            <option>Computer Vision</option>
            <option>NLP</option>
            <option>Research</option>
          </select>
        </Field>
        <Field label="AI / ML domain"><input {...register("aiDomain")} className={inputClass} placeholder="CNN, NLP, Recommendation System" /></Field>
        <Field label="Live URL"><input {...register("liveUrl")} className={inputClass} /></Field>
        <Field label="GitHub URL"><input {...register("githubUrl")} className={inputClass} /></Field>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/45">AI / ML project details</h2>
        <div className="grid gap-4">
          <Field label="Problem statement"><textarea {...register("problemStatement")} rows="4" className={inputClass} placeholder="What prediction, classification, detection, or optimization problem does this solve?" /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Key features"><input {...register("keyFeatures")} className={inputClass} placeholder="Image upload, prediction dashboard, explainability" /></Field>
            <Field label="ML techniques"><input {...register("mlTechniques")} className={inputClass} placeholder="SVM, Random Forest, Transfer Learning" /></Field>
            <Field label="Model architectures"><input {...register("modelArchitectures")} className={inputClass} placeholder="CNN, ResNet, LSTM, Transformer" /></Field>
            <Field label="Dataset name"><input {...register("datasetName")} className={inputClass} placeholder="Kaggle Plant Disease Dataset" /></Field>
            <Field label="Dataset URL"><input {...register("datasetUrl")} className={inputClass} /></Field>
            <Field label="Notebook URL"><input {...register("notebookUrl")} className={inputClass} /></Field>
            <Field label="Model URL"><input {...register("modelUrl")} className={inputClass} /></Field>
            <Field label="Paper / report URL"><input {...register("paperUrl")} className={inputClass} /></Field>
            <Field label="Demo video URL"><input {...register("demoVideoUrl")} className={inputClass} /></Field>
            <Field label="Accuracy / score"><input {...register("accuracy")} className={inputClass} placeholder="94.2% accuracy, F1 0.91" /></Field>
          </div>
          <Field label="Metrics summary"><textarea {...register("metrics")} rows="3" className={inputClass} placeholder="Precision, recall, F1-score, confusion matrix notes, validation result." /></Field>
        </div>
      </div>
      <CustomFieldsBuilder value={watch("customFields")} onChange={(fields) => setValue("customFields", fields)} />
      <div className="flex gap-4 text-sm text-white/65">
        <label><input type="checkbox" {...register("featured")} className="mr-2" />Featured</label>
        <label>Status <select {...register("status")} className={`${inputClass} ml-2 py-2`}><option>published</option><option>draft</option></select></label>
      </div>
    </FormShell>
  );
}
