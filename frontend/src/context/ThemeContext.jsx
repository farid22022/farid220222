import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

export const fallbackTheme = {
  siteName: "Md. Farid Hossen Rehad",
  logo: "",
  favicon: ""
};

const ThemeContext = createContext(null);

function normalizeTheme(theme) {
  return { ...fallbackTheme, ...(theme || {}) };
}

function applyTheme(theme) {
  document.title = theme.siteName || fallbackTheme.siteName;

  let favicon = document.querySelector("link[rel='icon']");
  if (theme.favicon) {
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = theme.favicon;
  } else if (favicon) {
    favicon.remove();
  }
}

function applyMode(isDark) {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
}

export function ThemeProvider({ children }) {
  const { admin, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const preferenceKey = useMemo(
    () => ["preferences", "theme", admin?.id || admin?._id || "public"],
    [admin]
  );
  const [theme, setThemeState] = useState(fallbackTheme);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("color-mode");
    return saved !== "light";
  });

  useEffect(() => {
    applyMode(isDark);
    localStorage.setItem("color-mode", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark((v) => !v), []);

  const query = useQuery({
    queryKey: preferenceKey,
    queryFn: async () => {
      const { data } = await api.get("/preferences/theme");
      return normalizeTheme(data);
    },
    enabled: !authLoading
  });

  useEffect(() => {
    const nextTheme = normalizeTheme(query.data || fallbackTheme);
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, [query.data]);

  const previewTheme = useCallback((nextTheme) => {
    setThemeState((current) => {
      const normalized = normalizeTheme({ ...current, ...(nextTheme || {}) });
      applyTheme(normalized);
      return normalized;
    });
  }, []);

  const mutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await api.put("/preferences/theme", values);
      return normalizeTheme(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(preferenceKey, data);
      queryClient.setQueryData(["preferences", "theme", "public"], data);
      previewTheme(data);
    }
  });

  const refreshTheme = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ["preferences", "theme"] }),
    [queryClient]
  );

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      setTheme: previewTheme,
      saveTheme: mutation.mutateAsync,
      refreshTheme,
      loading: authLoading || query.isLoading,
      saving: mutation.isPending,
      error: query.error || mutation.error
    }),
    [authLoading, isDark, mutation.error, mutation.isPending, mutation.mutateAsync, previewTheme, query.error, query.isLoading, refreshTheme, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
