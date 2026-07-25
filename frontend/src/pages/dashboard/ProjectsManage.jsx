import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/common/ConfirmModal";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import DataTable from "../../components/dashboard/DataTable";
import { useContentList, useDeleteContent } from "../../hooks/useContent";

export default function ProjectsManage() {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const { data: items = [], isLoading, isError, refetch } = useContentList("projects");
  const removeMutation = useDeleteContent("projects");

  async function remove() {
    try {
      await removeMutation.mutateAsync(target._id);
      toast.success("Project deleted");
      setTarget(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete project");
    }
  }

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <>
      <DataTable title="Manage Projects" addHref="/admin/projects/add" items={items} search={search} setSearch={setSearch} onDelete={setTarget} columns={[
        { key: "title", label: "Title" },
        { key: "projectType", label: "Type" },
        { key: "aiDomain", label: "AI / ML Domain", render: (item) => item.aiDomain || "-" },
        { key: "category", label: "Category" },
        { key: "status", label: "Status" },
        { key: "featured", label: "Featured", render: (item) => item.featured ? "Yes" : "No" }
      ]} />
      <ConfirmModal open={Boolean(target)} title="Delete project?" text="This project will be permanently removed." onCancel={() => setTarget(null)} onConfirm={remove} loading={removeMutation.isPending} />
    </>
  );
}
