import styles from "./contact.module.css";

interface SubmitMessageInterface {
  isSent: boolean;
  error: string | null;
}

const SubmitMessage = ({ isSent, error }: SubmitMessageInterface) => {
  return (
    <>
      {isSent && (
        <div className={styles.success}>
          Your message was sent successfully!
        </div>
      )}
      {error && <div className={styles.fail}>{error}</div>}
    </>
  );
};

export default SubmitMessage;
