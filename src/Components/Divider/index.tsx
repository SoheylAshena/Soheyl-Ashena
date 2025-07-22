import DividerSvg from "@/Assets/vectors/Div2.svg?react";
import styles from "./divider.module.css";

const Divider = () => {
  return (
    <div className={styles.container}>
      <DividerSvg className={styles.divider} />
    </div>
  );
};

export default Divider;
