const reduce = (state = "", action) => {
  console.log("action", action);
  switch (action.type) {
    case "FILTER/SETTER": {
      return action.playload;
    }
    default:
      return state;
  }
};

export const filterSetter = (filter) => {
  return {
    type: "FILTER/SETTER",
    playload: filter,
  };
};

export default reduce;
