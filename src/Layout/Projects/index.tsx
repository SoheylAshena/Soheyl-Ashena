import Section from "../../Components/Section";
import Project from "@/Components/Project";
import styles from "./projects.module.css";
import projs from "./projects-data";

const Projects = () => {
  return (
    <Section id="projects" className={styles.projects}>
      {projs.map((p, i) => (
        <a href={p.source} key={i}>
          <Project
            title={p.title}
            name={p.name}
            desc={p.desc}
            right={i % 2 !== 0}
            rotate={i % 2 !== 0 ? 180 : 0}
          />
        </a>
      ))}
    </Section>
  );
};

export default Projects;
