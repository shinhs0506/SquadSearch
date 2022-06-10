import IndividualMessage from "../../components/messages/individualMessage.js";
import ContactsContainer from "../../components/messages/contactsContainer.js";

export default function Messages() {
  return (
    <div>
      <ContactsContainer />
      <IndividualMessage />
    </div>
  );
}
