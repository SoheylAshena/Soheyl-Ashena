import Section from "@/Components/Section";
import styles from "./about.module.css";

import Pico from "@/Assets/vectors/PicFrame.svg?react";
import picture from "@/Assets/Vintage.png";

import VideoAlphaMask from "@/Components/AlphaVideoMask";
import vido from "@/Assets/videos/7.webm";

const About = () => {
  return (
    <VideoAlphaMask color="#ffe3ca" videoSrc={vido} playbackRate={2}>
      <Section id="About" className={styles.about}>
        <div className={styles.introduction}>
          <p className={styles.name}>I am Soheyl Ashena.</p>
          <p className={styles.desc}>
            I'm passionate about creating beautiful and user-friendly web
            experiences. As a front-end developer, I enjoy turning ideas into
            interactive websites and applications. My journey started with Html,
            Css, and JavaScript, I continue learning and improving myself
            everyday to become a professional developer.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.me} src={picture} alt="Picture of me" />
          <Pico />
        </div>
      </Section>
    </VideoAlphaMask>
  );
};

export default About;
