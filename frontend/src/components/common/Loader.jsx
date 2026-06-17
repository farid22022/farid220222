import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center text-sm text-white/60">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}
