import { useState } from 'react';

const bgred = {
  background: 'red',
  align: 'center'
}
const bgblue = {
  background: 'blue',
  align: 'center'
}

function App() {
  const [toggle, setToggle] = useState(true);

  let btn_class = toggle ? bgred : bgblue;

  return (
    <div style={{margin:10}}>
      <button style={btn_class} onClick={() => { setToggle(!toggle); }}>
        Button
      </button>
    </div>
  );
}

export default App;