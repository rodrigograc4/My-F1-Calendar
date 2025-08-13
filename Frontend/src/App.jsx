import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <div className="mx-auto min-h-screen max-w-[1440px] p-12">
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
