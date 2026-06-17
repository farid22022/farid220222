import { User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileSettings() {
  const { admin } = useAuth();

  return (
    <div className="glass max-w-3xl rounded-lg p-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-md bg-white p-3 text-black"><User className="h-5 w-5" /></span>
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-sm text-white/45">Admin profile is seeded from backend environment variables.</p>
        </div>
      </div>
      <div className="grid gap-3 text-sm">
        <p><span className="text-white/45">Name:</span> {admin?.name}</p>
        <p><span className="text-white/45">Email:</span> {admin?.email}</p>
        <p><span className="text-white/45">Role:</span> {admin?.role}</p>
      </div>
    </div>
  );
}
