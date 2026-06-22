import { createContext, useReducer } from "react";

const messageReducer = (state, action) => {
  console.log("state:", state);
  console.log("action:", action);
  switch (action.type) {
    case "VOTE": {
      const content = action.payload.content;
      return `anecdote '${content}' voted`;
    }
    case "CREATE": {
      const content = action.payload.content;
      return `you create anecdote:'${content}'`;
    }
    case "CLEAR":
      return "";
    default:
      return state;
  }
};

const MenssageContext = createContext();

export const MenssageContextProvide = ({ children }) => {
  const [message, messageDispach] = useReducer(messageReducer, "");

  return (
    <MenssageContext.Provider value={{ message, messageDispach }}>
      {children}
    </MenssageContext.Provider>
  );
};

export default MenssageContext;
