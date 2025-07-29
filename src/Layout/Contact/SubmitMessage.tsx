import styles from "./contact.module.css";

interface SubmitMessageInterface {
  isSent: boolean;
  error: string | null;
}

const SubmitMessage = ({ isSent, error }: SubmitMessageInterface) => {
  return (
    <div>
      {isSent && (
        <p className={styles.success}>Your message was sent successfully!</p>
      )}
      {error && <p className={styles.fail}>{error}</p>}
    </div>
  );
};

export default SubmitMessage;
