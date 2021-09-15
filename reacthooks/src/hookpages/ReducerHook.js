import React, { useReducer } from "react";
import { Button } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1, showText: state.showText };
    case "showText":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

const ReducerHookConst = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div>
      <h1>{state.count}</h1>
      <Button onClick={() => { dispatch({ type: "increment" }); dispatch({ type: "showText" }); }} >
        Click me
      </Button>

      {state.showText && <p> I am Here </p>}
    </div>
  );
};

export default ReducerHookConst;
