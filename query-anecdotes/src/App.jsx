import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import anecdoteServices from "./services/anecdotes";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteServices.getAll,
    retry: false,
  });

  console.log(result);
  const handleVote = (anecdote) => {
    console.log("vote");
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
