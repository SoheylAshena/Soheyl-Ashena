import styles from "./contact.module.css";

import Input from "@/Assets/vectors/input.svg?react";
import Area from "@/Assets/vectors/dd.svg?react";

const Inputs = () => {
  return (
    <>
      <div className={styles.smallInput}>
        <input type="text" name="from_name" placeholder="Your Name" required />
        <Input />
      </div>

      <div className={styles.smallInput}>
        <input
          type="email"
          name="from_email"
          placeholder="Your E-mail"
          required
        />
        <Input />
      </div>

      <div className={styles.textArea}>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me, I am all ears..."
          required
        ></textarea>
        <Area />
      </div>
    </>
  );
};

export default Inputs;
