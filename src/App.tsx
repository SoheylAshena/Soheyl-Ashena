import Navbar from "./Layout/Navbar";
import Main from "./Layout/Intro";
import Skills from "./Layout/Skills";
import Projects from "./Layout/Projects";
import Contact from "./Layout/Contact";
import Texture from "./Components/Texture";
import Divider from "./Components/Divider";
import About from "./Layout/About";
import Loading from "./Layout/Loading";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "auto";
      }, 1000);
    };

    // If the page is already loaded, call handler
    if (document.readyState === "complete") {
      setLoading(false);
      document.body.style.overflow = "auto";
    } else {
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  return (
    <>
      <Loading finished={!loading} />

      <Navbar />
      <Main loading={loading} />

      <Divider />

      <Projects />

      <Divider />

      <Skills />
      <About />

      <Divider />

      <Contact />

      <Texture />
      <Analytics />
    </>
  );
}

export default App;
