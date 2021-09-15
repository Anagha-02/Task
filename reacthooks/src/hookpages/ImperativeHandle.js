import React, { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { Button } from 'react-bootstrap';

const Button = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);

  useImperativeHandle(ref, () => ({
    alterToggle() {
      setToggle(!toggle);
    },
  }));

  return (
    <div>
      <Button>
        Button From Child
      </Button>
      {toggle && <span> Toggle by Parent </span>}
    </div>
  );
});


function ImperativeHandle() {
  const buttonRef = useRef(null);
  return (
    <div>
      <Button onClick={() => { buttonRef.current.alterToggle(); }} >
        Button From Parent
      </Button>
      <Button ref={buttonRef} />
    </div>
  );
}

export default ImperativeHandle;
