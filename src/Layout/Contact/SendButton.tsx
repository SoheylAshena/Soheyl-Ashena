import styles from "./contact.module.css";

import Button from "@/Assets/vectors/Button.svg?react";

interface SendButtonInterface {
  isSending: boolean;
}

const SendButton = ({ isSending }: SendButtonInterface) => {
  return (
    <div className={styles.submitCon}>
      <button type="submit" className={styles.button} disabled={true}>
        {isSending ? <span>Sending...</span> : "Send Message"}
      </button>
      <Button />
    </div>
  );
};

export default SendButton;
