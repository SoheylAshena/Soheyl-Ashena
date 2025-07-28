import { useEffect, useRef } from "react";
import styles from "./contact.module.css";

interface SubmitMessageInterface {
  isSent: boolean;
  error: string | null;
}

const SubmitMessage = ({ isSent, error }: SubmitMessageInterface) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView();
    }
  }, [isSent, error]);

  return (
    <>
      {isSent && (
        <div ref={messageRef} className={styles.success}>
          Your message was sent successfully!
        </div>
      )}
      {error && (
        <div ref={messageRef} className={styles.fail}>
          {error}
        </div>
      )}
    </>
  );
};

export default SubmitMessage;
