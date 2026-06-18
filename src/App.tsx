import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Learn from "@/pages/Learn";
import Profile from "@/pages/Profile";
import Achievements from "@/pages/Achievements";
import Settings from "@/pages/Settings";
import About from "@/pages/About";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAppStore } from "@/store/appStore";

function AppContent() {
  const { isLoggedIn } = useAppStore();

  const authRoutes = [
    { path: "/login", element: <Login />, showHeader: false, showFooter: false },
    { path: "/register", element: <Register />, showHeader: false, showFooter: false },
  ];

  const protectedRoutes = [
    { path: "/", element: <Home />, showHeader: true, showFooter: true, title: "首页" },
    { path: "/courses", element: <Courses />, showHeader: true, showFooter: true, title: "课程" },
    { path: "/courses/:id", element: <CourseDetail />, showHeader: true, showFooter: false, title: "课程详情" },
    { path: "/learn/:courseId/:moduleId", element: <Learn />, showHeader: true, showFooter: false, title: "学习" },
    { path: "/profile", element: <Profile />, showHeader: true, showFooter: true, title: "我的" },
    { path: "/achievements", element: <Achievements />, showHeader: true, showFooter: true, title: "成就" },
    { path: "/settings", element: <Settings />, showHeader: true, showFooter: false, title: "设置" },
    { path: "/about", element: <About />, showHeader: true, showFooter: false, title: "关于我们" },
  ];

  return (
    <Routes>
      {authRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <div className="min-h-screen">
              {route.showHeader && <Header title={route.title} showBack={route.path !== "/"} />}
              <main>
                {route.element}
              </main>
              {route.showFooter && <Footer />}
            </div>
          }
        />
      ))}
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
