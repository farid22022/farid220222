import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import { formatBytes, optimizeImage } from "../../utils/imageUpload";
import AppImage from "../common/AppImage";

function normalizeImages(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

export default function MultiImageUploader({ label = "Gallery images", value, onChange, field = "gallery" }) {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const images = normalizeImages(value);

  async function upload(event) {
    const input = event.target;
    const selectedFiles = Array.from(input.files || []);
    if (!selectedFiles.length) return;

    const filesToProcess = selectedFiles.slice(0, 8);
    if (selectedFiles.length > filesToProcess.length) toast.error("Upload up to 8 images at a time");

    let previewUrls = [];
    setUploading(true);
    setProgress(0);
    setError("");

    try {
      const files = await Promise.all(filesToProcess.map(optimizeImage));
      previewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);

      const originalBytes = filesToProcess.reduce((sum, file) => sum + file.size, 0);
      const optimizedBytes = files.reduce((sum, file) => sum + file.size, 0);
      setDetails(
        optimizedBytes < originalBytes
          ? `Optimized ${formatBytes(originalBytes)} → ${formatBytes(optimizedBytes)}`
          : `${formatBytes(optimizedBytes)} ready to upload`
      );

      const form = new FormData();
      files.forEach((file) => form.append("images", file));
      form.append("field", field);
      const { data } = await api.post("/upload/multiple", form, {
        onUploadProgress: (eventValue) => {
          if (eventValue.total) setProgress(Math.round((eventValue.loaded / eventValue.total) * 100));
        }
      });

      onChange([...images, ...data.map((item) => item.url)]);
      setDetails(`${files.length} image${files.length === 1 ? "" : "s"} uploaded to ImageBB`);
      toast.success(`${files.length} image${files.length === 1 ? "" : "s"} uploaded`);
    } catch (uploadError) {
      const message = uploadError.response?.data?.message || uploadError.message || "Image upload failed";
      setError(message);
      toast.error(message);
    } finally {
      setUploading(false);
      setProgress(0);
      setPreviews([]);
      input.value = "";
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }

  const displayImages = [...images, ...previews];

  return (
    <div className="grid gap-3">
      <span className="text-sm text-white/55">{label}</span>
      {displayImages.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {displayImages.map((image, index) => {
            const isPreview = index >= images.length;
            return (
              <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
                <AppImage
                  src={image}
                  alt={`${label} ${index + 1}`}
                  wrapperClassName="h-36 w-full"
                  className="h-full w-full object-cover"
                  eager={isPreview}
                />
                {isPreview ? (
                  <div className="absolute inset-0 grid place-items-center bg-black/55 text-xs text-white">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {progress || 0}%
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onChange(images.filter((_, itemIndex) => itemIndex !== index))}
                    disabled={uploading}
                    className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/70 text-white/70 opacity-0 transition group-hover:opacity-100 disabled:opacity-40"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
      <label className={`inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-white/70 ${uploading ? "cursor-wait opacity-60" : "cursor-pointer"}`}>
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
        {uploading ? "Uploading gallery..." : "Choose and upload images"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
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
