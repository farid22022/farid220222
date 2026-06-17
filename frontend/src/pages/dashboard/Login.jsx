import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { inputClass } from "../../components/dashboard/Field";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: "admin@example.com", password: "change-me-now" }
  });

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  async function submit(values) {
    try {
      await login(values);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#05050a] px-4 text-white">
      <form onSubmit={handleSubmit(submit)} className="glass w-full max-w-md rounded-lg p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-md bg-white p-3 text-black"><Lock className="h-5 w-5" /></span>
          <div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="text-sm text-white/45">Use credentials from backend .env</p>
          </div>
        </div>
        <div className="grid gap-4">
          <input type="email" {...register("email", { required: true })} className={inputClass} placeholder="Email" />
          <input type="password" {...register("password", { required: true })} className={inputClass} placeholder="Password" />
          <button disabled={formState.isSubmitting} className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-black">
            {formState.isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
