import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import DesktopSkill from "@/Assets/vectors/Skill-Tree.svg?react";
import MobileSkills from "@/Assets/vectors/mobile.svg?react";

import styles from "./skillTree.module.css";

import { learned } from "./learned";

const SkillTree = () => {
  const conRef = useRef(null);

  useGSAP(
    () => {
      const skills = learned.map((skill) => document.getElementById(skill.id));

      gsap.to(skills, {
        transformOrigin: "center",
        fill: "var(--color-primary)",
        stagger: 0.3,
      });
    },
    { scope: conRef.current! }
  );

  return (
    <div ref={conRef} className={styles.container}>
      {window.innerWidth >= 800 ? <DesktopSkill /> : <MobileSkills />}
    </div>
  );
};

export default SkillTree;
