import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

type Mode = "dark" | "light";

export interface ThemeSliceState {
  mode: Mode;
}

// No localStorage here to avoid SSR hydration issues
const initialState: ThemeSliceState = {
  mode: "light", // default mode for both server and client
};

// Utility to save mode in localStorage (only client-side)
const saveModeToLocalStorage = (mode: Mode) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme-mode", mode);
  }
};

export const ThemeSlice = createAppSlice({
  name: "theme",
  initialState,
  reducers: (create) => ({
    toggle: create.reducer((state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      saveModeToLocalStorage(state.mode);
    }),

    setMode: create.reducer((state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
      saveModeToLocalStorage(state.mode);
    }),
  }),

  selectors: {
    selectMode: (state) => state.mode,
  },
});

export const { toggle, setMode } = ThemeSlice.actions;
export const { selectMode } = ThemeSlice.selectors;
