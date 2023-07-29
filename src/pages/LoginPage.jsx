import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../state/actions";

export default function LoginPage() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((store) => store.error);

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const register = () => {};

  const login = () => {
    dispatch(actions.loginUser({ email, password }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isRegistering) {
      register();
    } else {
      login();
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <form className="flex flex-col gap-2 w-fit" onSubmit={handleSubmit}>
        <div className="self-end mb-6">
          <label className="flex gap-2 justify-between items-end label cursor-pointer w-full ">
            {isRegistering ? (
              <span className="label-text">I have an account</span>
            ) : (
              <span className="label-text">I need an account</span>
            )}
            <input
              type="checkbox"
              className="toggle"
              checked={isRegistering}
              onChange={() => setIsRegistering(!isRegistering)}
            />
          </label>
        </div>
        <input
          required
          type="text"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {isRegistering ? (
          <>
            <input
              required
              type="password"
              placeholder="Re-type password"
              className="input input-bordered w-full max-w-xs"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            />
            <button className="btn btn-outline mb-4 self-end">Register</button>
          </>
        ) : (
          <button className="btn btn-outline mb-4 self-end">Log In</button>
        )}
      </form>
      <div>
        {errorMessage}
        <p>{email}</p>
        <p>{password}</p>
        <p>{password2}</p>
      </div>
    </div>
  );
}
