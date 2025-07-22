import { navLinks, socialLinks } from "./nav-data";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <a data-text="S" className={styles.textFill} href="#intro">
        S
      </a>

      <div className={styles.navList}>
        {navLinks.map((item) => (
          <a key={item.label} href={item.pathname}>
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      <div className={styles.social}>
        {socialLinks.map((item) => (
          <a
            href={item.url}
            key={item.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <item.icon />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
