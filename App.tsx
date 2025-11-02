import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import BookLandingPage from './pages/BookLandingPage';
import Speaking from './pages/Speaking';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import { useEffect } from 'react';

// New Pages and Components
import Login from './pages/Login';
import ExclusiveArea from './pages/ExclusiveArea';
import AdminUsers from './pages/AdminUsers';
import ProtectedRoute from './components/ProtectedRoute';
import QuestionnaireLobby from './pages/QuestionnaireLobby';
import Questionnaire from './pages/Questionnaire';
import CardSkeleton from './components/skeletons/CardSkeleton';
import BlogPostSkeleton from './components/skeletons/BlogPostSkeleton';
import MediaKit from './pages/MediaKit';
import CmsConnectionChecker from './components/CmsConnectionChecker';
import Domains from './pages/Domains';
import Dns from './pages/Dns';
import DebugApi from './pages/DebugApi';


// Exclusive Area Sub-Pages
import ExclusiveDashboard from './pages/exclusive/ExclusiveDashboard';
import ExclusiveVideoteca from './pages/exclusive/ExclusiveVideoteca';
import ExclusiveEnviarPergunta from './pages/exclusive/ExclusiveEnviarPergunta';


// A helper component to scroll to top on navigation change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-black text-slate-200">
        <CmsConnectionChecker />
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/livros" element={<Books />} />
            <Route path="/livros/:slug" element={<BookLandingPage />} />
            <Route path="/palestras" element={<Speaking />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/media-kit" element={<MediaKit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/dns" element={<Dns />} />
            <Route path="/debug-api" element={<DebugApi />} />


            {/* Protected Routes */}
            <Route 
              path="/area-exclusiva" 
              element={
                <ProtectedRoute>
                  <ExclusiveArea />
                </ProtectedRoute>
              } 
            >
              <Route index element={<ExclusiveDashboard />} />
              <Route path="videoteca" element={<ExclusiveVideoteca />} />
              <Route path="enviar-pergunta" element={<ExclusiveEnviarPergunta />} />
            </Route>

            <Route 
              path="/area-exclusiva/questionarios" 
              element={
                <ProtectedRoute>
                  <QuestionnaireLobby />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/area-exclusiva/questionario/:slug" 
              element={
                <ProtectedRoute>
                  <Questionnaire />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/usuarios" 
              element={
                <ProtectedRoute role="admin">
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />

            {/* 404 Not Found */}
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold">404 - Página Não Encontrada</h1>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;