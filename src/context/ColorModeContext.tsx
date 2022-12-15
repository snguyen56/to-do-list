import { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type Props = {
  children: React.ReactNode;
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export function ToggleColorMode({ children }: Props) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
