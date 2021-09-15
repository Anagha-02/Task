import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

function EffectHook() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  );
}

export default EffectHook;
