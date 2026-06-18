import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      return [...state, action.payload];
    },
    voteAnecdote(state, action) {
      console.log(state);
      console.log(action);
      const id = action.payload;
      const anecdoteToChange = state.find((s) => s.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((s) => (s.id !== id ? s : changedAnecdote));
    },
    setterAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { newAnecdote, voteAnecdote, setterAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
