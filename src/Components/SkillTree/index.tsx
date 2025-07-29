import { useRef } from "react";

import DesktopSkill from "@/Assets/vectors/Skill-Tree.svg?react";
import MobileSkills from "@/Assets/vectors/mobile.svg?react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./skillTree.module.css";

import { learned } from "./learned";

const SkillTree = () => {
  const conRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const learnedSkills = learned
        .map((skill) => conRef.current!.querySelector(`#${skill.id}`))
        .filter(Boolean); // remove nulls

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: conRef.current,
          start: "top 20%",
        },
      });

      tl.to(learnedSkills, {
        fill: "var(--color-primary)",
        opacity: 1,
        stagger: 0.2,
      });
    },
    { scope: conRef, revertOnUpdate: true }
  );

  return (
    <div ref={conRef} className={styles.container}>
      {window.innerWidth >= 800 ? <DesktopSkill /> : <MobileSkills />}
    </div>
  );
};

export default SkillTree;
