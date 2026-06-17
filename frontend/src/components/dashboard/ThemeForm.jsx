import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field, inputClass } from "./Field";
import FormShell from "./FormShell";

const colorFields = [
  ["primaryColor", "Primary"],
  ["secondaryColor", "Secondary"],
  ["accentColor", "Accent"],
  ["backgroundColor", "Background"],
  ["textColor", "Text"],
  ["gradientOne", "Gradient one"],
  ["gradientTwo", "Gradient two"]
];

const earthControls = [
  ["earthScale", "Earth size", 0.35, 1.2, 0.01],
  ["earthScrollZoom", "Scroll zoom", 0.2, 1.6, 0.01],
  ["earthHorizontalDrift", "Left/right movement", 0.2, 1.8, 0.01],
  ["earthRotationSpeed", "Rotation speed", 0.15, 2.5, 0.01],
  ["earthGlowIntensity", "Warm light strength", 0.1, 1.2, 0.01],
  ["earthOpacity", "Scene opacity", 0.1, 1, 0.01],
  ["earthMotionFluidity", "Motion fluidity", 0.02, 0.18, 0.005]
];

export default function ThemeForm({ initialValues, onSubmit, onPreview, loading }) {
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    const subscription = watch((values) => onPreview(values));
    return () => subscription.unsubscribe();
  }, [watch, onPreview]);

  return (
    <FormShell title="Theme Settings" onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Site name"><input {...register("siteName")} className={inputClass} /></Field>
        <Field label="Font family"><input {...register("fontFamily")} className={inputClass} /></Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {colorFields.map(([name, label]) => (
          <Field key={name} label={label}>
            <div className="grid grid-cols-[3rem_1fr] overflow-hidden rounded-md border border-white/10">
              <input type="color" {...register(name)} className="h-full w-full bg-transparent" />
              <input {...register(name)} className="bg-white/[0.04] px-3 py-3 text-sm outline-none" />
            </div>
          </Field>
        ))}
      </div>
      <Field label="Favicon URL"><input {...register("favicon")} className={inputClass} /></Field>
      <div className="rounded-lg border border-white/10 bg-black/25 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">3D Earth Scene</h2>
            <p className="text-sm text-white/45">Control the public website space animation.</p>
          </div>
          <label className="inline-flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/70">
            <input type="checkbox" {...register("earthSceneEnabled")} className="h-4 w-4 accent-red-500" />
            Enabled
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {earthControls.map(([name, label, min, max, step]) => (
            <Field key={name} label={`${label}: ${Number(watch(name) || 0).toFixed(step < 0.01 ? 3 : 2)}`}>
              <div className="grid grid-cols-[1fr_5rem] gap-3">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  {...register(name, { valueAsNumber: true })}
                  className="h-11 accent-red-500"
                />
                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  {...register(name, { valueAsNumber: true })}
                  className={inputClass}
                />
              </div>
            </Field>
          ))}
        </div>
      </div>
    </FormShell>
  );
}
