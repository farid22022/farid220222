import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import DashboardLayout from "./components/layout/DashboardLayout";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Projects from "./pages/public/Projects";
import ProjectDetails from "./pages/public/ProjectDetails";
import Blog from "./pages/public/Blog";
import BlogDetails from "./pages/public/BlogDetails";
import Certificates from "./pages/public/Certificates";
import CertificateDetails from "./pages/public/CertificateDetails";
import Stories from "./pages/public/Stories";
import Research from "./pages/public/Research";
import Uses from "./pages/public/Uses";
import Links from "./pages/public/Links";
import Contact from "./pages/public/Contact";
import TextShare from "./pages/public/TextShare";
import Login from "./pages/dashboard/Login";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProjectsManage from "./pages/dashboard/ProjectsManage";
import ProjectAdd from "./pages/dashboard/ProjectAdd";
import ProjectEdit from "./pages/dashboard/ProjectEdit";
import BlogsManage from "./pages/dashboard/BlogsManage";
import BlogAdd from "./pages/dashboard/BlogAdd";
import BlogEdit from "./pages/dashboard/BlogEdit";
import CertificatesManage from "./pages/dashboard/CertificatesManage";
import CertificateAdd from "./pages/dashboard/CertificateAdd";
import CertificateEdit from "./pages/dashboard/CertificateEdit";
import StoriesManage from "./pages/dashboard/StoriesManage";
import StoryAdd from "./pages/dashboard/StoryAdd";
import StoryEdit from "./pages/dashboard/StoryEdit";
import LogoSettings from "./pages/dashboard/LogoSettings";
import ProfileSettings from "./pages/dashboard/ProfileSettings";
import MessagesManage from "./pages/dashboard/MessagesManage";

function PublicShell({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-right" toastOptions={{ style: { background: "var(--card-solid)", color: "var(--text)", border: "1px solid var(--border)" } }} />
        <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<ProjectsManage />} />
            <Route path="projects/add" element={<ProjectAdd />} />
            <Route path="projects/:id/edit" element={<ProjectEdit />} />
            <Route path="blogs" element={<BlogsManage />} />
            <Route path="blogs/add" element={<BlogAdd />} />
            <Route path="blogs/:id/edit" element={<BlogEdit />} />
            <Route path="certificates" element={<CertificatesManage />} />
            <Route path="certificates/add" element={<CertificateAdd />} />
            <Route path="certificates/:id/edit" element={<CertificateEdit />} />
            <Route path="stories" element={<StoriesManage />} />
            <Route path="stories/add" element={<StoryAdd />} />
            <Route path="stories/:id/edit" element={<StoryEdit />} />
            <Route path="logo" element={<LogoSettings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="messages" element={<MessagesManage />} />
          </Route>
        </Route>
        <Route path="/" element={<PublicShell><Home /></PublicShell>} />
        <Route path="/about" element={<PublicShell><About /></PublicShell>} />
        <Route path="/projects" element={<PublicShell><Projects /></PublicShell>} />
        <Route path="/projects/:slug" element={<PublicShell><ProjectDetails /></PublicShell>} />
        <Route path="/blog" element={<PublicShell><Blog /></PublicShell>} />
        <Route path="/blog/:slug" element={<PublicShell><BlogDetails /></PublicShell>} />
        <Route path="/certificates" element={<PublicShell><Certificates /></PublicShell>} />
        <Route path="/certificates/:slug" element={<PublicShell><CertificateDetails /></PublicShell>} />
        <Route path="/stories" element={<PublicShell><Stories /></PublicShell>} />
        <Route path="/research" element={<PublicShell><Research /></PublicShell>} />
        <Route path="/uses" element={<PublicShell><Uses /></PublicShell>} />
        <Route path="/links" element={<PublicShell><Links /></PublicShell>} />
        <Route path="/share-text" element={<PublicShell><TextShare /></PublicShell>} />
        <Route path="/contact" element={<PublicShell><Contact /></PublicShell>} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
