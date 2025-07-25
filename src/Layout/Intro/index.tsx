import Section from "@/Components/Section";
import styles from "./intro.module.css";
import BrushIntro from "@/Components/BrushIntro";
import Leaf from "@/Assets/vectors/leaf.svg?react";
import Texts from "@/Assets/vectors/Texts.svg?react";

const Main = () => {
  return (
    <Section id="intro" className={styles.intro}>
      {/* Texts */}
      <div className={styles.textContainer}>
        <p className={styles.name}>Soheyl Ashena</p>
        <BrushIntro className={styles.shape} Shape={Texts} duration={5} />
      </div>

      {/* Image */}
      <div className={styles.leaf}>
        <BrushIntro className={styles.leaf} Shape={Leaf} duration={3} />
      </div>
    </Section>
  );
};

export default Main;
