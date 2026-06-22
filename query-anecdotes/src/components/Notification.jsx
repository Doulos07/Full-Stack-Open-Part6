import { useContext } from "react";
import MenssageContext from "../anecdotesContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const { message } = useContext(MenssageContext);

  console.log("Notificaction", message);
  if (!message) return null;

  console.log();
  return <div style={style}>{message}</div>;
};

export default Notification;
