import "./App.css";
import MakeCveList from "./components/MainPage/MakeCveList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MakeExploitsList from "./components/MainPage/MakeExploitsList";

const App = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={Theme({ mode })}>
      <CssBaseline />
      <Box className="app">
        <Header mode={mode} setMode={setMode} />
        <MakeCveList />
        <MakeExploitsList />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
