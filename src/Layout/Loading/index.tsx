import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./loading.module.css";
import { useRef } from "react";

const index = ({ finished }: { finished: boolean }) => {
  const loaderRef = useRef(null);

  useGSAP(
    () => {
      if (finished) {
        const tl = gsap.timeline();
        tl.to(loaderRef.current, {
          x: "100%",
          duration: 1,
          ease: "power2.inOut",
        }).to(loaderRef.current, {
          display: "none",
        });
      }
    },
    { dependencies: [finished], revertOnUpdate: true }
  );

  return (
    <div ref={loaderRef} className={styles.container}>
      Loading...
    </div>
  );
};

export default index;
