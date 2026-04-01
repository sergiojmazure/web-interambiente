import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/public/Home';
import Servicios from './pages/public/Servicios';
import Portfolio from './pages/public/Portfolio';
import Novedades from './pages/public/Novedades';
import NovedadDetalle from './pages/public/NovedadDetalle';
import Contacto from './pages/public/Contacto';

import Dashboard from './pages/admin/Dashboard';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminPosts from './pages/admin/AdminPosts';
import AdminSellos from './pages/admin/AdminSellos';
import Login from './pages/auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="clientes" element={<Portfolio />} />
          <Route path="novedades" element={<Novedades />} />
          <Route path="novedades/:id" element={<NovedadDetalle />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="novedades" element={<AdminPosts />} />
          <Route path="sellos" element={<AdminSellos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
