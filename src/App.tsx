import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PlayerPage from "./pages/PlayerPage";
import { VideoProvider } from "./context/VideoProvider";

const App = () => {
  return (
    <VideoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/player" element={<PlayerPage />} />
        </Routes>
      </Router>
    </VideoProvider>
  );
};

export default App;
