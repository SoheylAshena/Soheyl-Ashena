import { useEffect, useRef } from "react";
import styles from "./skillTree.module.css";

import DesktopSkill from "@/Assets/vectors/Skill-Tree.svg?react";
import MobileSkills from "@/Assets/vectors/mobile.svg?react";

const learned = [
  {
    id: "lower",
    desc: "Basic understanding of lower-level programming concepts or languages.",
  },
  {
    id: "js",
    desc: "Proficient in JavaScript, including ES6+ features and asynchronous programming.",
  },
  {
    id: "css",
    desc: "Skilled in writing responsive and modular CSS, including animations and layout systems.",
  },
  {
    id: "html",
    desc: "Strong knowledge of semantic HTML for building accessible and structured content.",
  },
  {
    id: "react",
    desc: "Experienced in building component-based UIs using React, including hooks and state management.",
  },
  {
    id: "git",
    desc: "Comfortable with version control using Git, including branching, merging, and collaboration workflows.",
  },
  {
    id: "ts",
    desc: "Familiar with TypeScript for writing safer and more predictable JavaScript applications.",
  },
  {
    id: "tailwind",
    desc: "Experienced in using Tailwind CSS for utility-first styling and rapid UI development.",
  },
  {
    id: "next",
    desc: "Proficient in building server-side rendered and static websites with Next.js.",
  },
  {
    id: "framer",
    desc: "Able to create interactive animations and prototypes using Framer Motion.",
  },
  {
    id: "github",
    desc: "Skilled in using GitHub for source code management, issues, and collaboration.",
  },
  {
    id: "accessibility",
    desc: "Understanding of web accessibility principles and how to build inclusive user interfaces.",
  },
];

const SkillTree = () => {
  const conRef = useRef(null);
  const hasAnimated = useRef(false); // prevent re-animation

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let delay = 0;
          learned.forEach((item) => {
            const el = document.getElementById(item.id);
            delay += 200;
            setTimeout(() => {
              el?.classList.add(styles.learned);
            }, delay);

            el?.addEventListener("mouseenter", () => {});
            el?.addEventListener("mouseleave", () => {});
          });

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (conRef.current) observer.observe(conRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={conRef} className={styles.container}>
      {window.innerWidth >= 800 ? <DesktopSkill /> : <MobileSkills />}
    </div>
  );
};

export default SkillTree;
