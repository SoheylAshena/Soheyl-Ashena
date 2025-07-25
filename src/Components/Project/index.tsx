import styles from "./project.module.css";
import Frame from "@/Assets/vectors/Project Frame.svg?react";

import { useRef } from "react";

import VideoColorMaskOverlay from "../VideoMask";
import vido from "@/Assets/videos/3.mp4";

interface ProjectProps {
  name: string;
  title: string;
  desc: string;
  right?: boolean;
}

const Project: React.FC<ProjectProps> = ({ name, title, desc, right }) => {
  const projRef = useRef(null);

  return (
    <VideoColorMaskOverlay
      videoSrc={vido}
      width={200}
      height={200}
      color="#ffd3ad"
      inverted={true}
      playbackRate={3}
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
