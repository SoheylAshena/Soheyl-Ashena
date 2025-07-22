import Navbar from "./Layout/Navbar";
import Main from "./Layout/Intro";
import Skills from "./Layout/Skills";
import Projects from "./Layout/Projects";
import Contact from "./Layout/Contact";
import Texture from "./Components/Texture";
import Divider from "./Components/Divider";
import About from "./Layout/About";
import { useEffect } from "react";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <Texture />
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
