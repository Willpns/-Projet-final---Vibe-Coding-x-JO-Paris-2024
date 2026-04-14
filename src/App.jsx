import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import Home        from './pages/Home';
import Ecosysteme  from './pages/Ecosysteme';
import Athlete     from './pages/Athlete';
import Heritage    from './pages/Heritage';
import Innovations from './pages/Innovations';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/ecosysteme"   element={<Ecosysteme />} />
        <Route path="/athlete"      element={<Athlete />} />
        <Route path="/heritage"     element={<Heritage />} />
        <Route path="/innovations"  element={<Innovations />} />
        {/* Catch-all → Home */}
        <Route path="*"             element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
