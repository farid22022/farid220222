import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import { inputClass } from "./Field";

function normalizeImages(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function MultiImageUploader({ label = "Gallery images", value, onChange }) {
  const [manualUrl, setManualUrl] = useState("");
  const images = normalizeImages(value);

  function updateImages(nextImages) {
    onChange(nextImages.filter(Boolean));
  }

  function addManualUrl() {
    const nextUrl = manualUrl.trim();
    if (!nextUrl) return;
    updateImages([...images, nextUrl]);
    setManualUrl("");
  }

  async function upload(event) {
    const selectedFiles = Array.from(event.target.files || []);
    if (!selectedFiles.length) return;

    const files = selectedFiles.slice(0, 8);
    if (selectedFiles.length > files.length) toast.error("Upload up to 8 images at a time");

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    updateImages([...images, ...previewUrls]);

    try {
      const form = new FormData();
      files.forEach((file) => form.append("images", file));
      const { data } = await api.post("/upload/multiple", form);
      updateImages([...images, ...data.map((item) => item.url)]);
      toast.success(`${files.length} image${files.length === 1 ? "" : "s"} uploaded`);
    } catch (error) {
      updateImages(images);
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      event.target.value = "";
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }

  return (
    <div className="grid gap-3">
      <span className="text-sm text-white/55">{label}</span>
      {images.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
              <img src={image} alt={`${label} ${index + 1}`} className="h-36 w-full object-cover" />
              <button
                type="button"
                onClick={() => updateImages(images.filter((_, itemIndex) => itemIndex !== index))}
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/70 text-white/70 opacity-0 transition group-hover:opacity-100"
                aria-label="Remove image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <div className="grid gap-2 md:grid-cols-[1fr_auto_auto]">
        <input
          value={manualUrl}
          onChange={(event) => setManualUrl(event.target.value)}
          placeholder="Paste image URL"
          className={inputClass}
        />
        <button
          type="button"
          onClick={addManualUrl}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-white/70"
        >
          <Plus className="h-4 w-4" />
          Add URL
        </button>
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-white/70">
          <ImagePlus className="h-4 w-4" />
          Upload
          <input type="file" accept="image/*" multiple onChange={upload} className="hidden" />
        </label>
      </div>
    </div>
  );
}
