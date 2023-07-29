import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route exact path="/login" Component={LoginPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </Layout>
  );
}
