const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("failed to fetch anecdotes");
  }
  return await response.json();
};

const newAnecdote = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };
  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error(errorData.error);
  }
  return await response.json();
};

const voteAnecdote = async (anecdote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }),
  };

  console.log(options);
  const response = await fetch(`${baseUrl}/${anecdote.id}`, options);

  if (!response.ok) {
    throw new Error("failed to vote anecdote");
  }

  return await response.json();
};

export default { getAll, newAnecdote, voteAnecdote };
