import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    axios
      .get("/api/time")
      .then((res) => res.data)
      .then((data) => setTime(data.content))
      .catch(console.error);
  }, []);

  return (
    <>
      <h1>Project Name</h1>
      <div>Time: {time}</div>
    </>
  );
}

export default App;
