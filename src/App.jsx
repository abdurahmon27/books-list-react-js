import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/background";
import NotFound from "./pages/not-found";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";
import { ThemeProvider } from "@mui/material";
import theme from "./lib/mui-theme";

function App() {

  return (
    <Router>
      <div className="w-full min-h-screen relative">
        <Background />
        <div className="mulish container mx-auto">
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Home />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/books" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </div>
      </div>
    </Router>
  );
}

export default App;
