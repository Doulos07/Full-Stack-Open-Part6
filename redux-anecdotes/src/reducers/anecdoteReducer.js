import { createSlice } from "@reduxjs/toolkit";
import anecdoteServices from "../serives/anecdotes";

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

const { setterAnecdote, newAnecdote, voteAnecdote } = anecdoteSlice.actions;

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch(setterAnecdote(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAne = await anecdoteServices.newAnecdote(anecdote);
    dispatch(newAnecdote(newAne));
  };
};

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const responseAnecdote = await anecdoteServices.voteAnecdote(anecdote);
    dispatch(voteAnecdote(responseAnecdote.id));
  };
};

export default anecdoteSlice.reducer;
