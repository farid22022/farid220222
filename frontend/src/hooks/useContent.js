import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const contentKeys = {
  all: (resource) => [resource],
  list: (resource, variant = "all") => [resource, "list", variant],
  detail: (resource, identifier) => [resource, "detail", identifier]
};

async function get(path) {
  const { data } = await api.get(path);
  return data;
}

export function useContentList(resource, { featured = false } = {}) {
  const variant = featured ? "featured" : "all";
  return useQuery({
    queryKey: contentKeys.list(resource, variant),
    queryFn: () => get(`/${resource}${featured ? "/featured" : ""}`)
  });
}

export function useContentBySlug(resource, slug) {
  return useQuery({
    queryKey: contentKeys.detail(resource, slug),
    queryFn: () => get(`/${resource}/${slug}`),
    enabled: Boolean(slug)
  });
}

export function useContentById(resource, id) {
  return useQuery({
    queryKey: contentKeys.detail(resource, id),
    queryFn: () => get(`/${resource}/id/${id}`),
    enabled: Boolean(id)
  });
}

function useInvalidateContent(resource) {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: contentKeys.all(resource) });
}

export function useCreateContent(resource) {
  const invalidate = useInvalidateContent(resource);
  return useMutation({
    mutationFn: async (values) => {
      const { data } = await api.post(`/${resource}`, values);
      return data;
    },
    onSuccess: invalidate
  });
}

export function useUpdateContent(resource, id) {
  const invalidate = useInvalidateContent(resource);
  return useMutation({
    mutationFn: async (values) => {
      const { data } = await api.put(`/${resource}/${id}`, values);
      return data;
    },
    onSuccess: invalidate
  });
}

export function useDeleteContent(resource) {
  const invalidate = useInvalidateContent(resource);
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/${resource}/${id}`);
      return data;
    },
    onSuccess: invalidate
  });
}
