import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({ open, title, text, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-lg border border-white/10 bg-[#0d0d14] p-6 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-red-500/10 p-3 text-red-300">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="mt-4 text-sm text-white/60">{text}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/70">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white">
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
