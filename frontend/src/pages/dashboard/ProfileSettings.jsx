import { User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImageUploader from "../../components/dashboard/ImageUploader";
import { Field, inputClass } from "../../components/dashboard/Field";
import FormShell from "../../components/dashboard/FormShell";
import { useAuth } from "../../context/AuthContext";

export default function ProfileSettings() {
  const { admin, updateProfile } = useAuth();
  const { register, handleSubmit, reset, setValue, watch, formState } = useForm({
    defaultValues: { name: admin?.name || "", avatar: admin?.avatar || "" }
  });

  useEffect(() => {
    reset({ name: admin?.name || "", avatar: admin?.avatar || "" });
  }, [admin, reset]);

  async function submit(values) {
    try {
      await updateProfile(values);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile");
    }
  }

  return (
    <FormShell
      title="Profile Settings"
      onSubmit={handleSubmit(submit)}
      loading={formState.isSubmitting}
    >
      <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-4">
        <span className="rounded-md bg-white p-3 text-black"><User className="h-5 w-5" /></span>
        <div>
          <p className="font-medium">{admin?.email}</p>
          <p className="text-sm text-white/45">{admin?.role}</p>
        </div>
      </div>
      <Field label="Display name">
        <input {...register("name", { required: true })} className={inputClass} />
      </Field>
      <ImageUploader
        label="Profile image"
        value={watch("avatar")}
        onChange={(url) => setValue("avatar", url, { shouldDirty: true })}
        field="avatar"
      />
    </FormShell>
  );
}
