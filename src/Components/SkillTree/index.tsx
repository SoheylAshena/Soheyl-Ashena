import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

import DesktopSkill from "@/Assets/vectors/Skill-Tree.svg?react";
import MobileSkills from "@/Assets/vectors/mobile.svg?react";

import styles from "./skillTree.module.css";

import { learned, notLearned } from "./learned";

const SkillTree = () => {
  const conRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const learnedSkills = learned
        .map((skill) => conRef.current!.querySelector(`#${skill.id}`))
        .filter(Boolean); // remove nulls

      const notLearnedSkills = notLearned
        .map((skill) => conRef.current!.querySelector(`#${skill.id}`))
        .filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: conRef.current,
          start: "top center",
        },
      });

      tl.fromTo(
        learnedSkills,
        { scaleY: 0, transformOrigin: "center" },
        {
          fill: "var(--color-primary)",
          scaleY: 1,
          stagger: 0.2,
        }
      ).from(notLearnedSkills, { opacity: 0 });
    },
    { scope: conRef }
  );

  return (
    <div ref={conRef} className={styles.container}>
      {window.innerWidth >= 800 ? <DesktopSkill /> : <MobileSkills />}
    </div>
  );
};

export default SkillTree;
