import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import './index.css';

function App() {
 return (
    <>
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App
