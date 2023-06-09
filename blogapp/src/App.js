import "./App.css";
import ArticleDetailPage from "./Pages/ArticlesDetail/ArticleDetailPage";
import HomePage from "./Pages/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/Register/RegisterPage";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Home/Login/Login";
import ProfilePage from "./Pages/Profile/ProfilePage";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Admin from "./Pages/Admin/Components/Pages/Admin";
import Comments from "./Pages/Admin/Components/Pages/Comments";
import NewPosts from "./Pages/Admin/Components/Pages/NewPosts";
function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<NewPosts />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
