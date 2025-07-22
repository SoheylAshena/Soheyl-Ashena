import Section from "@/Components/Section";
import styles from "./skills.module.css";

import SkillTree from "@/Components/SkillTree";

const Skills = () => {
  return (
    <Section id="skills" className={styles.skills}>
      <SkillTree />
    </Section>
  );
};

export default Skills;
