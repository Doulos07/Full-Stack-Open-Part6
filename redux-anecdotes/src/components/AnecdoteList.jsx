import { useSelector, useDispatch } from "react-redux";
import { anecdoteVote } from "../reducers/anecdoteReducer";
import { notification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const sortedAnecdotes = (a, b) => {
    return b.votes - a.votes;
  };

  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) {
      return anecdotes;
    } else {
      return anecdotes.filter((a) =>
        a.content.toLowerCase().includes(filter.toLowerCase()),
      );
    }
  });
  const anecdotesSorted = [...anecdotes].sort(sortedAnecdotes);

  const handleVote = (anecdote) => {
    dispatch(anecdoteVote(anecdote));
    dispatch(notification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <>
      {anecdotesSorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
