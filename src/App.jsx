import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import {Home} from "./pages/Home.jsx";
import {NotFound} from "./pages/NotFound.jsx";
import { PageLoader } from "./components/PageLoader.jsx";
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minLoaderDuration = 3000;
    const startTime = Date.now();

    let timeoutId;

    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoaderDuration - elapsed);
      timeoutId = window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", finishLoading);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
