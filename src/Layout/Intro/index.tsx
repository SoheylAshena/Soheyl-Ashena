import Section from "@/Components/Section";
import styles from "./intro.module.css";
import BrushIntro from "@/Components/BrushIntro";
import Leaf from "@/Assets/vectors/leaf.svg?react";
import Texts from "@/Assets/vectors/Texts.svg?react";

interface MainProps {
  loading: boolean;
}

const Main: React.FC<MainProps> = ({ loading }) => {
  return (
    <Section id="intro" className={styles.intro}>
      {/* Texts */}
      <div className={styles.textContainer}>
        <p className={styles.name}>Soheyl Ashena</p>
        <BrushIntro paused={loading} Shape={Texts} duration={5} />
      </div>

      {/* Image */}
      <div className={styles.leaf}>
        <BrushIntro paused={loading} Shape={Leaf} duration={3} />
      </div>
    </Section>
  );
};

export default Main;
