import { useEffect, useState } from "react";
import styles from "./textReveal.module.css";

interface TextRevealProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

const TextReveal = ({
  children,
  duration = 2000,
  delay = 0,
}: TextRevealProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const halfDuration = duration / 2;
    const timer = setTimeout(() => setShowText(true), halfDuration + delay);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={styles.container}>
      <p className={`${styles.text} ${showText ? styles.textVisible : ""}`}>
        {children}
      </p>
      <div
        className={styles.cover}
        style={
          {
            "--duration": `${duration}ms`,
            "--delay": `${delay}ms`,
          } as React.CSSProperties & Record<string, string>
        }
      ></div>
    </div>
  );
};

export default TextReveal;
