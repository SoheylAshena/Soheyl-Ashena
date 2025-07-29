import Navbar from "./Layout/Navbar";
import Main from "./Layout/Intro";
import Skills from "./Layout/Skills";
import Projects from "./Layout/Projects";
import Contact from "./Layout/Contact";
import Texture from "./Components/Texture";
import Divider from "./Components/Divider";
import About from "./Layout/About";
import TheEnd from "./Components/TheEnd";
import Loading from "./Layout/Loading";

import useLoading from "./Hooks/useLoading";

import gsap from "gsap";
import { DrawSVGPlugin, ScrollTrigger } from "gsap/all";
import { Analytics } from "@vercel/analytics/react";

import styles from "./app.module.css";
import SmoothScroll from "./Components/SmoothScrollContent";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

function App() {
  const loading = useLoading();

  return (
    <>
      <Loading finished={!loading} />
      <Navbar />

      <SmoothScroll>
        <div className={styles.content}>
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
      </SmoothScroll>

      <Texture />
      <Analytics />
    </>
  );
}

export default App;
