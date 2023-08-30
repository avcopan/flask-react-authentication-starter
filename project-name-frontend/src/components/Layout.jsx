import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import viteIcon from "/vite.svg";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  return (
    <div>
      <header>
        <nav>
          <h1>
            <img src={viteIcon} />
            <Link to="/">project name</Link>
          </h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <li>
                <a onClick={() => dispatch(actions.logoutUser())}>Log Out</a>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/login/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
