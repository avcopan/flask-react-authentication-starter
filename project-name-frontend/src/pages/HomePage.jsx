import { useSelector } from "react-redux";

export default function HomePage() {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <h2>Home Page</h2>
      {user && <p>User: {user.email}</p>}
    </div>
  );
}
