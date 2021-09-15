import React, { useState } from "react";

function StateHookConst() {
  const [inputValue, setInputValue] = useState(" Original Value ");

  let onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <div>
      <label> Value: </label>
      <input placeholder="enter a value" onChange={onChange} /> 
      <br />
      {inputValue}
    </div>
  );
};


export default StateHookConst;
