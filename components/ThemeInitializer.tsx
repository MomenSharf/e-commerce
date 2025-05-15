"use client";
import { setMode } from "@/lib/features/theme/themeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved === "dark" || saved === "light") {
      dispatch(setMode(saved));
    }
  }, [dispatch]);

  return null;
}
