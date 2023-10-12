import {
  HashRouter as Router,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Homepage from "./pages/HomePage";
import Game from "./pages/Game";

export default function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="game" element={<Game />} />
      </Routes>
    </Router>
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    //   <Routes>
    //     <Route path="/" element={<Homepage />} />
    //     <Route path="game" element={<Game />} />
    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </BrowserRouter>
  );
}
