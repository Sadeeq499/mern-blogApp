import "./App.css";
import ArticleDetailPage from "./Pages/ArticlesDetail/ArticleDetailPage";
import HomePage from "./Pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/Register/RegisterPage";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Home/Login/Login";
import ProfilePage from "./Pages/Profile/ProfilePage";
function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
