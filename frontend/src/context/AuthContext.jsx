import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { queryClient } from "../query/queryClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("portfolio_admin_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("portfolio_admin_token")));

  useEffect(() => {
    async function loadMe() {
      if (!localStorage.getItem("portfolio_admin_token")) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setAdmin(data.admin);
        localStorage.setItem("portfolio_admin_user", JSON.stringify(data.admin));
      } catch {
        setAdmin(null);
        localStorage.removeItem("portfolio_admin_user");
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, []);

  async function login(values) {
    const { data } = await api.post("/auth/login", values);
    localStorage.setItem("portfolio_admin_token", data.token);
    localStorage.setItem("portfolio_admin_user", JSON.stringify(data.admin));
    setAdmin(data.admin);
    await queryClient.invalidateQueries({ queryKey: ["preferences"] });
    toast.success("Welcome back");
  }

  function logout() {
    localStorage.removeItem("portfolio_admin_token");
    localStorage.removeItem("portfolio_admin_user");
    setAdmin(null);
    queryClient.removeQueries({ queryKey: ["preferences"] });
    toast.success("Logged out");
  }

  async function updateProfile(values) {
    const { data } = await api.put("/auth/profile", values);
    setAdmin(data.admin);
    localStorage.setItem("portfolio_admin_user", JSON.stringify(data.admin));
    return data.admin;
  }

  const value = useMemo(
    () => ({ admin, loading, isAuthenticated: Boolean(admin), login, logout, updateProfile }),
    [admin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
