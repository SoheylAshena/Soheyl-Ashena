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
import TheEnd from "./Components/TheEnd";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollSmoother);

function App() {
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
    });
  });

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
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
            <Main loading={loading} />
            <Divider />
            <Projects />
            <Divider />
            <Skills />
            <About />
            <Divider />
            <Contact />
            <TheEnd />
          </div>
        </div>
      </div>
      <Texture />
      <Analytics />
    </>
  );
}

export default App;
