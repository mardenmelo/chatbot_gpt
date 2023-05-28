import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Home } from "./components/Home";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
        <Home />
    </ThemeProvider>
  )
}
