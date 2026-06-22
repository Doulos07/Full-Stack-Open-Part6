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
      //queryUse.invalidateQueries({ queryKey: ["anecdotes"] });
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    newAnecdoteMutation.mutate(content);
    messageDispach({ type: "CREATE", payload: { content } });
    setTimeout(() => messageDispach({ type: "CLEAR" }), 5000);
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
