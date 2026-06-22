import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteServices from "./services/anecdotes";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import MenssageContext from "./anecdotesContext";

const App = () => {
  const queryClient = useQueryClient();
  const { messageDispach } = useContext(MenssageContext);

  const voteAnecdoteMutate = useMutation({
    mutationFn: anecdoteServices.voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const editAnecdotes = anecdotes.map((a) =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote,
      );
      queryClient.setQueryData(["anecdotes"], editAnecdotes);
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteServices.getAll,
    retry: false,
  });

  console.log(result);
  const handleVote = (anecdote) => {
    voteAnecdoteMutate.mutate(anecdote);
    messageDispach({ type: "VOTE", payload: anecdote });
    setTimeout(() => {
      messageDispach({ type: "CLEAR" });
    }, 5000);
  };

  if (result.isPending) {
    return <div> laoading data...</div>;
  }

  if (result.isError) {
    console.log(result.error.message);
    return <div>{result.error.message}</div>;
  }

  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
