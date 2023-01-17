import { Theme } from "./types";

export const systemTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export const getTheme = () => (localStorage.getItem("theme") as Theme) || systemTheme();
