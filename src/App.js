import { useReducer } from 'react';
import produce from 'immer';
import './App.css';

const INCREMENT_COUNT = 'increment-count';
const CHANGE_VALUE = 'change-value-to-add';
const DECREMENT = 'decrement-count';
const SUBMIT_FORM = 'submit-form';

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case CHANGE_VALUE:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case SUBMIT_FORM:
      return {
        ...state,
        count: state.count + state.valueToAdd,
      };

    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(produce(reducer), {
    count: 10,
    valueToAdd: 0,
  });

  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    });
  };

  const decrement = () => {
    dispatch({
      type: DECREMENT,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: SUBMIT_FORM,
    });
  };
  const handleChange = (e) => {
    // setValueToAdd(parseInt(e.target.value) || 0)
    const value = parseInt(e.target.value) || 0;
    dispatch({
      type: CHANGE_VALUE,
      payload: value,
    });
  };
  return (
    <div className="App">
      <h1>Count is {state.count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          type="number"
          onChange={handleChange}
          value={state.valueToAdd || ''}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
