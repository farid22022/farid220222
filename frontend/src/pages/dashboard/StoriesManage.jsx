import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/common/ConfirmModal";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import DataTable from "../../components/dashboard/DataTable";
import { useContentList, useDeleteContent } from "../../hooks/useContent";

export default function StoriesManage() {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const { data: items = [], isLoading, isError, refetch } = useContentList("stories");
  const removeMutation = useDeleteContent("stories");

  async function remove() {
    try {
      await removeMutation.mutateAsync(target._id);
      toast.success("Story deleted");
      setTarget(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete story");
    }
  }

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <>
      <DataTable title="Manage Stories" addHref="/admin/stories/add" items={items} search={search} setSearch={setSearch} onDelete={setTarget} columns={[
        { key: "title", label: "Title" },
        { key: "type", label: "Type" },
        { key: "date", label: "Date", render: (item) => new Date(item.date).toLocaleDateString() },
        { key: "featured", label: "Featured", render: (item) => item.featured ? "Yes" : "No" }
      ]} />
      <ConfirmModal open={Boolean(target)} title="Delete story?" text="This story will be permanently removed." onCancel={() => setTarget(null)} onConfirm={remove} loading={removeMutation.isPending} />
    </>
  );
}
