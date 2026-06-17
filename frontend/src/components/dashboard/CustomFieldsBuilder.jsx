import { Plus, Trash2 } from "lucide-react";
import ImageUploader from "./ImageUploader";
import MultiImageUploader from "./MultiImageUploader";
import { Field, inputClass } from "./Field";

const fieldTypes = [
  ["text", "Title / short text"],
  ["textarea", "Description / long text"],
  ["image", "Single image"],
  ["gallery", "Gallery images"]
];

function emptyValueForType(type) {
  return type === "gallery" ? [] : "";
}

function normalizeFields(value) {
  return Array.isArray(value) ? value : [];
}

export default function CustomFieldsBuilder({ value, onChange }) {
  const fields = normalizeFields(value);

  function updateField(index, patch) {
    onChange(fields.map((field, fieldIndex) => (fieldIndex === index ? { ...field, ...patch } : field)));
  }

  function addField() {
    onChange([...fields, { label: "", type: "text", value: "" }]);
  }

  function removeField(index) {
    onChange(fields.filter((_, fieldIndex) => fieldIndex !== index));
  }

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Custom fields</h2>
        <button
          type="button"
          onClick={addField}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white/70"
        >
          <Plus className="h-4 w-4" />
          Add field
        </button>
      </div>

      <div className="grid gap-4">
        {fields.map((field, index) => (
          <div key={index} className="rounded-md border border-white/10 bg-black/20 p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
              <Field label="Label">
                <input
                  value={field.label || ""}
                  onChange={(event) => updateField(index, { label: event.target.value })}
                  className={inputClass}
                  placeholder="Section title"
                />
              </Field>
              <Field label="Field type">
                <select
                  value={field.type || "text"}
                  onChange={(event) => updateField(index, { type: event.target.value, value: emptyValueForType(event.target.value) })}
                  className={inputClass}
                >
                  {fieldTypes.map(([type, label]) => (
                    <option key={type} value={type}>{label}</option>
                  ))}
                </select>
              </Field>
              <button
                type="button"
                onClick={() => removeField(index)}
                className="mt-7 inline-flex h-11 items-center justify-center rounded-md border border-white/10 px-3 text-white/60"
                aria-label="Remove custom field"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4">
              {field.type === "textarea" ? (
                <Field label="Value">
                  <textarea
                    value={field.value || ""}
                    onChange={(event) => updateField(index, { value: event.target.value })}
                    rows="4"
                    className={inputClass}
                  />
                </Field>
              ) : null}

              {(!field.type || field.type === "text") ? (
                <Field label="Value">
                  <input
                    value={field.value || ""}
                    onChange={(event) => updateField(index, { value: event.target.value })}
                    className={inputClass}
                  />
                </Field>
              ) : null}

              {field.type === "image" ? (
                <ImageUploader
                  label="Value"
                  value={field.value || ""}
                  onChange={(url) => updateField(index, { value: url })}
                  field={`custom-${index}`}
                />
              ) : null}

              {field.type === "gallery" ? (
                <MultiImageUploader
                  label="Value"
                  value={field.value || []}
                  onChange={(images) => updateField(index, { value: images })}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
