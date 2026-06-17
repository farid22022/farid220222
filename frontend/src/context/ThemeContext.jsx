import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axiosInstance";

const fallbackTheme = {
  siteName: "Md. Farid Hossen Rehad",
  logo: "",
  favicon: "",
  primaryColor: "#ff3030",
  secondaryColor: "#ff8a50",
  accentColor: "#ff3434",
  backgroundColor: "#000004",
  textColor: "#f8fafc",
  gradientOne: "#ff3030",
  gradientTwo: "#ff8a50",
  fontFamily: "Manrope",
  earthSceneEnabled: true,
  earthScale: 0.68,
  earthScrollZoom: 0.72,
  earthHorizontalDrift: 1,
  earthRotationSpeed: 1,
  earthGlowIntensity: 0.68,
  earthOpacity: 0.72,
  earthMotionFluidity: 0.08
};

const ThemeContext = createContext(null);

function normalizeTheme(theme) {
  return { ...fallbackTheme, ...(theme || {}) };
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primaryColor);
  root.style.setProperty("--secondary", theme.secondaryColor);
  root.style.setProperty("--accent", theme.accentColor);
  root.style.setProperty("--background", theme.backgroundColor);
  root.style.setProperty("--text", theme.textColor);
  root.style.setProperty("--gradient-one", theme.gradientOne);
  root.style.setProperty("--gradient-two", theme.gradientTwo);
  root.style.setProperty("--font-family", theme.fontFamily);

  if (theme.favicon) {
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = theme.favicon;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(fallbackTheme);
  const [loading, setLoading] = useState(true);

  async function refreshTheme() {
    try {
      const { data } = await api.get("/theme");
      const nextTheme = normalizeTheme(data);
      setTheme(nextTheme);
      applyTheme(nextTheme);
    } catch {
      setTheme(fallbackTheme);
      applyTheme(fallbackTheme);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshTheme();
  }, []);

  function previewTheme(nextTheme) {
    const normalizedTheme = normalizeTheme(nextTheme);
    setTheme(normalizedTheme);
    applyTheme(normalizedTheme);
  }

  const value = useMemo(
    () => ({ theme, setTheme: previewTheme, refreshTheme, loading }),
    [theme, loading]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
