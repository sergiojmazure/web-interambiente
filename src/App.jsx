import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/public/Home';

const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const Servicios = lazy(() => import('./pages/public/Servicios'));
const Portfolio = lazy(() => import('./pages/public/Portfolio'));
const Novedades = lazy(() => import('./pages/public/Novedades'));
const NovedadDetalle = lazy(() => import('./pages/public/NovedadDetalle'));
const Contacto = lazy(() => import('./pages/public/Contacto'));
const Privacidad = lazy(() => import('./pages/public/Privacidad'));

const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminPortfolio = lazy(() => import('./pages/admin/AdminPortfolio'));
const AdminPosts = lazy(() => import('./pages/admin/AdminPosts'));
const AdminSellos = lazy(() => import('./pages/admin/AdminSellos'));
const AdminAutomatizacion = lazy(() => import('./pages/admin/AdminAutomatizacion'));
const Login = lazy(() => import('./pages/auth/Login'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-light)', color: 'var(--color-primary)'}}>Cargando...</div>}>
        <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="clientes" element={<Portfolio />} />
          <Route path="novedades" element={<Novedades />} />
          <Route path="novedades/:id" element={<NovedadDetalle />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="privacidad" element={<Privacidad />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="novedades" element={<AdminPosts />} />
          <Route path="sellos" element={<AdminSellos />} />
          <Route path="automatizacion" element={<AdminAutomatizacion />} />
        </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
