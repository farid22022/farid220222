import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp, Mail, MailOpen, Trash2 } from "lucide-react";
import api from "../../api/axiosInstance";
import ConfirmModal from "../../components/common/ConfirmModal";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";

function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const { data } = await api.get("/messages");
      return data;
    },
  });
}

function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.patch(`/messages/${id}/read`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

function useDeleteMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/messages/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

function MessageCard({ msg, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const markRead = useMarkRead();

  function handleToggle() {
    setExpanded((v) => !v);
    if (!msg.read) markRead.mutate(msg._id);
  }

  const formattedDate = new Date(msg.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`rounded-xl border transition ${
        msg.read
          ? "border-white/10 bg-white/[0.02]"
          : "border-white/20 bg-white/[0.06]"
      }`}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="mt-0.5 shrink-0">
          {msg.read ? (
            <MailOpen className="h-4 w-4 text-white/30" />
          ) : (
            <Mail className="h-4 w-4 text-blue-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">{msg.name}</span>
            <span className="text-white/30">·</span>
            <a
              href={`mailto:${msg.email}`}
              className="text-xs text-blue-400 hover:underline"
            >
              {msg.email}
            </a>
            {!msg.read && (
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                NEW
              </span>
            )}
          </div>
          {msg.context && (
            <p className="mt-0.5 text-xs text-white/35">Re: {msg.context}</p>
          )}
          <p className="mt-1 text-xs text-white/35">{formattedDate}</p>
          {!expanded && (
            <p className="mt-2 line-clamp-2 text-sm text-white/65">{msg.message}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => onDelete(msg)}
            className="rounded-md p-1.5 text-white/30 transition hover:bg-red-500/20 hover:text-red-400"
            title="Delete message"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={handleToggle}
            className="rounded-md p-1.5 text-white/30 transition hover:bg-white/10 hover:text-white"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-white/10 bg-white/[0.02] px-5 py-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">
            {msg.message}
          </p>
          <a
            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.context || "Your message")}`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/55 transition hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" />
            Reply via email
          </a>
        </div>
      )}
    </div>
  );
}

export default function MessagesManage() {
  const [target, setTarget] = useState(null);
  const { data: messages = [], isLoading, isError, refetch } = useMessages();
  const deleteMutation = useDeleteMessage();

  async function confirmDelete() {
    try {
      await deleteMutation.mutateAsync(target._id);
      toast.success("Message deleted");
      setTarget(null);
    } catch {
      toast.error("Could not delete message");
    }
  }

  if (isLoading) return <Loader label="Loading messages" />;
  if (isError) return <ErrorState onRetry={refetch} />;

  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Messages</h1>
          <p className="mt-0.5 text-sm text-white/45">
            {unread > 0 ? `${unread} unread · ` : ""}
            {messages.length} total
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-white/10 py-24 text-center">
          <Mail className="mx-auto mb-3 h-8 w-8 text-white/20" />
          <p className="text-sm text-white/30">No messages yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {messages.map((msg) => (
            <MessageCard key={msg._id} msg={msg} onDelete={setTarget} />
          ))}
        </div>
      )}

      <ConfirmModal
        open={Boolean(target)}
        title="Delete message?"
        text="This message will be permanently removed."
        onCancel={() => setTarget(null)}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </>
  );
}
