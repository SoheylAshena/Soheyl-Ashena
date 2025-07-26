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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Main />

      <Divider />

      <Projects />

      <Divider />

      <Skills />
      <About />

      <Divider />

      <Contact />

      <Texture />
    </>
  );
}

export default App;
