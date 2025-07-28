import clsx from "clsx";
import styles from "./section.module.css";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLElement | null>;
}

const Section: React.FC<SectionProps> = ({ id, children, className, ref }) => {
  return (
    <section id={id} ref={ref} className={clsx(styles.section, className)}>
      {children}
    </section>
  );
};

export default Section;
