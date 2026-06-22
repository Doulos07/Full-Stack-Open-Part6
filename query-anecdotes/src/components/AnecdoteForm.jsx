import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdoteService from "../services/anecdotes";
import { useContext } from "react";
import MenssageContext from "../anecdotesContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { messageDispach } = useContext(MenssageContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.newAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      messageDispach({
        type: "CREATE",
        payload: { content: newAnecdote.content },
      });
      setTimeout(() => messageDispach({ type: "CLEAR" }), 5000);
    },
    onError: (error) => {
      console.log(error);
      messageDispach({ type: "ERROR", payload: { content: error } });
      setTimeout(() => messageDispach({ type: "CLEAR" }), 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
