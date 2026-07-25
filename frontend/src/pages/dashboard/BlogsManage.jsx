import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/common/ConfirmModal";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import DataTable from "../../components/dashboard/DataTable";
import { useContentList, useDeleteContent } from "../../hooks/useContent";

export default function BlogsManage() {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const { data: items = [], isLoading, isError, refetch } = useContentList("blogs");
  const removeMutation = useDeleteContent("blogs");

  async function remove() {
    try {
      await removeMutation.mutateAsync(target._id);
      toast.success("Blog deleted");
      setTarget(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete blog");
    }
  }

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <>
      <DataTable title="Manage Blogs" addHref="/admin/blogs/add" items={items} search={search} setSearch={setSearch} onDelete={setTarget} columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "published", label: "Published", render: (item) => item.published ? "Yes" : "No" },
        { key: "featured", label: "Featured", render: (item) => item.featured ? "Yes" : "No" }
      ]} />
      <ConfirmModal open={Boolean(target)} title="Delete blog?" text="This blog will be permanently removed." onCancel={() => setTarget(null)} onConfirm={remove} loading={removeMutation.isPending} />
    </>
  );
}
