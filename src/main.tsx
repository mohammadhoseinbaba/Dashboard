import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";

export type ColorMode = "light" | "dark";
export const ColorModeContext = React.createContext<{
  mode: ColorMode;
  toggle: () => void;
}>({
  mode: "dark",
  toggle: () => {},
});

const queryClient = new QueryClient();

function Root() {
  const [mode, setMode] = React.useState<ColorMode>(() => {
    const saved = localStorage.getItem("mode") as ColorMode | null;
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  const toggle = React.useCallback(() => {
    setMode((m) => {
      const next: ColorMode = m === "dark" ? "light" : "dark";
      localStorage.setItem("mode", next);
      return next;
    });
  }, []);

  const theme = React.useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  return (
    <React.StrictMode>
      <ColorModeContext.Provider value={{ mode, toggle }}>
          <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Root />
);
