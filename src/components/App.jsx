import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route exact path="/login" Component={LoginPage} />
      </Routes>
    </Layout>
  );
}
