import { useEffect, useState, useMemo } from "react";
import { Button } from 'react-bootstrap';

function MemoHook() {
  const [data, setData] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setData(
      [
        {
          "id": 1,
          "name": "This is long"
        },
        {
          "id": 2,
          "name": "Name 2"
        },
        {
          "id": 3,
          "name": "This is longest Name"
        },
        {
          "id": 4,
          "name": "New Name"
        },
        {
          "id": 5,
          "name": "This is longest"
        }
      ]
    );
  }, []);

  const findLongestName = (data) => {
    if (!data) return null;

    let longestName = "";
    for (let i = 0; i < data.length; i++) {
      let currentName = data[i].name;
      if (currentName.length > longestName.length) {
        longestName = currentName;
      }
    }

    console.log("THIS WAS COMPUTED");

    return longestName;
  };

  const getLongestName = useMemo(() => findLongestName(data), [toggle]);

  return (
    <div className="App">
      <br />
      <div> {getLongestName} </div>

      <br />
      <Button onClick={() => {setToggle(!toggle);}}>
        {" "}
        Toggle
      </Button>
      {toggle && <h1> toggle </h1>}
    </div>
  );
}


export default MemoHook;