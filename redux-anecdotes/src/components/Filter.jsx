import { useSelector, useDispatch } from "react-redux";
import { filterSetter } from "../reducers/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div>
      filter
      <input
        name="filter"
        value={filter}
        onChange={({ target }) => {
          dispatch(filterSetter(target.value));
        }}
      />
    </div>
  );
};

export default Filter;
