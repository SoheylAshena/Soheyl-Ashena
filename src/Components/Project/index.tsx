import styles from "./project.module.css";
import Frame from "@/Assets/vectors/Project Frame.svg?react";

interface ProjectProps {
  name: string;
  title: string;
  desc: string;
  right?: boolean;
}

const Project: React.FC<ProjectProps> = ({ name, title, desc, right }) => {
  return (
    <div
      className={`${styles.project} ${right ? styles.textRight : ""} ${
        right ? styles.reverse : ""
      }`}
    >
      <div className={`${styles.projFrame} `}>
        <Frame />
        <p>{name}</p>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.projTitle}>{title}</p>
        <p className={styles.projDesc}>{desc}</p>
      </div>
    </div>
  );
};

export default Project;
