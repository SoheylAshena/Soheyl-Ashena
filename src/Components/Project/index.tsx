import { useRef } from "react";

import VideoColorMaskOverlay from "../AlphaVideoMask";

import Frame from "@/Assets/vectors/Project Frame.svg?react";
import vido from "@/Assets/videos/3.1.webm";

import styles from "./project.module.css";

interface ProjectProps {
  name: string;
  title: string;
  desc: string;
  right?: boolean;
  rotate?: number;
}

const Project: React.FC<ProjectProps> = ({
  name,
  title,
  desc,
  right,
  rotate,
}) => {
  const projRef = useRef(null);

  return (
    <VideoColorMaskOverlay
      videoSrc={vido}
      color="#ffe3ca"
      // color="#000000"
      inverted={true}
      rotate={rotate}
    >
      <div
        ref={projRef}
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
    </VideoColorMaskOverlay>
  );
};

export default Project;
