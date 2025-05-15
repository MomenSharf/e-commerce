"use client";

import { useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { selectMode, toggle } from "@/lib/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export function ModeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);

  // apply .dark class to <html> on every mode change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <Button
      variant="ghost"
      className="h-10 w-10 px-0"
      onClick={() => dispatch(toggle())}
    >
      {mode === "dark" ? (
        <MoonIcon className="h-6 w-6 transition-all" />
      ) : (
        <SunIcon className="h-6 w-6 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
