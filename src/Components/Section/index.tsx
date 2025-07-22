import clsx from "clsx";
import styles from "./section.module.css";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className }) => {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      {children}
    </section>
  );
};

export default Section;
