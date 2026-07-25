import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import { formatBytes, optimizeImage } from "../../utils/imageUpload";
import AppImage from "../common/AppImage";

export default function ImageUploader({ label = "Image", value, onChange, field = "image" }) {
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  async function upload(event) {
    const input = event.target;
    const originalFile = input.files?.[0];
    if (!originalFile) return;

    let previewUrl = "";
    setUploading(true);
    setProgress(0);
    setError("");

    try {
      const file = await optimizeImage(originalFile);
      previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setDetails(
        file.size < originalFile.size
          ? `Optimized ${formatBytes(originalFile.size)} → ${formatBytes(file.size)}`
          : `${formatBytes(file.size)} ready to upload`
      );

      const form = new FormData();
      form.append("image", file);
      form.append("field", field);
      const { data } = await api.post("/upload/image", form, {
        onUploadProgress: (eventValue) => {
          if (eventValue.total) setProgress(Math.round((eventValue.loaded / eventValue.total) * 100));
        }
      });

      onChange(data.url);
      setDetails("Uploaded to ImageBB and saved in MongoDB");
      toast.success("Image uploaded");
    } catch (uploadError) {
      const message = uploadError.response?.data?.message || uploadError.message || "Image upload failed";
      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
      setProgress(0);
      setPreview("");
      input.value = "";
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    }
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-white/55">{label}</span>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            disabled={uploading}
            className="inline-flex items-center gap-1 text-xs text-red-300/80 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        ) : null}
      </div>
      {preview || value ? (
        <div className="relative">
          <AppImage
            src={preview || value}
            alt={field}
            wrapperClassName="h-44 w-full rounded-md border border-white/10"
            className="h-full w-full object-cover"
            eager
          />
          {uploading ? (
            <div className="absolute inset-0 grid place-items-center rounded-md bg-black/60 text-sm text-white">
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading {progress || 0}%
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
      <label className={`inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-white/70 ${uploading ? "cursor-wait opacity-60" : "cursor-pointer"}`}>
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
        {uploading ? "Uploading..." : "Choose and upload image"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={upload}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {details ? <p className="text-xs text-emerald-200/60">{details}</p> : null}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
