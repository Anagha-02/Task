import React, { useRef } from "react";
import { Button } from 'react-bootstrap';

function RefHook() {
  const inputRef = useRef(null);

  const onClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <h1> Name </h1>
      <input type="text" placeholder="Value" ref={inputRef} />
      <Button onClick={onClick}> Change Name </Button>

    </div>
  );
}

export default RefHook;
