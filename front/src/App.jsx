import { useState } from "react";
import Homepage from "../components/Homepage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Homepage />
      <p>Some random text</p>
    </>
  );
}

export default App;
