import { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "./state/actions";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(actions.getUser());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/login/:mode?"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
