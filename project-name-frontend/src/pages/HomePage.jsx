import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    console.log("HI");
    axios
      .get("/api/time")
      .then((res) => res.data)
      .then((data) => setTime(data.contents))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <p>Time: {time}</p>
    </div>
  );
}
