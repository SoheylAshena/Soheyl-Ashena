import useContact from "@/Hooks/useContact";
import Inputs from "./Inputs";
import SendButton from "./SendButton";
import SubmitMessage from "./SubmitMessage";
import Section from "@/Components/Section";

import styles from "./contact.module.css";

const Contact = () => {
  const { isSending, isSent, error, sendEmail, form } = useContact();

  return (
    <Section className={styles.contact} id="Contact">
      <form className={styles.form} ref={form} onSubmit={sendEmail}>
        <Inputs />
        <SendButton isSending={isSending} />
        <SubmitMessage isSent={isSent} error={error} />
      </form>
    </Section>
  );
};

export default Contact;
