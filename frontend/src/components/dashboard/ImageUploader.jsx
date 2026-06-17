import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import { inputClass } from "./Field";

export default function ImageUploader({ label = "Image", value, onChange, field = "image" }) {
  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);

    try {
      const form = new FormData();
      form.append("image", file);
      const { data } = await api.post("/upload/image", form);
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    }
  }

  return (
    <div className="grid gap-3">
      <span className="text-sm text-white/55">{label}</span>
      {value ? <img src={value} alt={field} className="h-44 w-full rounded-md object-cover" /> : null}
      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <input value={value || ""} onChange={(event) => onChange(event.target.value)} placeholder="Paste image URL or upload" className={inputClass} />
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm text-white/70">
          <ImagePlus className="h-4 w-4" />
          Upload
          <input type="file" accept="image/*" onChange={upload} className="hidden" />
        </label>
      </div>
    </div>
  );
}
