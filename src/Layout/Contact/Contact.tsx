import useContact from "@/Hooks/useContact";
import Inputs from "./Inputs";
import SendButton from "./SendButton";
import SubmitMessage from "./SubmitMessage";

const Contact = () => {
  const { isSending, isSent, error, sendEmail, form } = useContact();

  return (
    <div className="container mx-auto px-6 py-20" id="contact">
      <form ref={form} onSubmit={sendEmail}>
        <Inputs />
        <SendButton isSending={isSending} />
        <SubmitMessage isSent={isSent} error={error} />
      </form>
    </div>
  );
};

export default Contact;
