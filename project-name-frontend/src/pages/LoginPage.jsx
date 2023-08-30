import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../state/actions";

export default function LoginPage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((store) => store.error);

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { mode } = useParams();
  useEffect(() => {
    setIsRegistering(mode == "register");
  }, [mode]);

  const register = () => {
    if (password !== password2) {
      dispatch(actions.retypeError());
    } else {
      dispatch(actions.registerUser({ email, password }));
    }
  };

  const login = () => {
    dispatch(actions.loginUser({ email, password }));
  };

  return (
    <div>
      <div>
        <div>
          <label>
            {isRegistering ? (
              <span>I have an account</span>
            ) : (
              <span>I need an account</span>
            )}
            <input
              type="checkbox"
              checked={isRegistering}
              onChange={() => setIsRegistering(!isRegistering)}
            />
          </label>
        </div>
        <input
          required
          type="text"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {isRegistering ? (
          <>
            <input
              required
              type="password"
              placeholder="Re-type password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />
            <button onClick={register}>Register</button>
          </>
        ) : (
          <button onClick={login}>Log In</button>
        )}
      </div>
      <div>{errorMessage}</div>
    </div>
  );
}
