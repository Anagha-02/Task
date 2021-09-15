import { useCallback, useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

function Child({ returnComment }) {
  useEffect(() => {
    console.log("FUNCTION WAS CALLED");
  }, [returnComment]);

  return <div>{returnComment(" This is using callback hook. ")}</div>;
}

function CallBackHook() {
  const [toggle, setToggle] = useState(false);
  const data = "Click to toggle! ";

  const returnComment = useCallback(
    (name) => {
      return name + " " + data;
    },
    [data]
  );

  return (
    <div className="App">
      <Child returnComment={returnComment} />

      <Button onClick={() => { setToggle(!toggle); }}> {" "}
        Toggle
      </Button>
      {toggle && <h1> You are Toggling  </h1>}
    </div>
  );
}

export default CallBackHook;
