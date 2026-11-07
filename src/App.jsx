
import { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Beyond from './sections/Beyond';

import ProjectDetail from './pages/ProjectDetail';

import './App.css';

function Home() {
  useLayoutEffect(() => {
    const savedPosition = sessionStorage.getItem('homeScrollY');

    if (savedPosition !== null) {
      window.scrollTo({
        top: Number(savedPosition),
        behavior: 'instant',
      });

      requestAnimationFrame(() => {
        sessionStorage.removeItem('homeScrollY');
      });
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Beyond />
    </>
  );
}

function Layout() {
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/projects/:slug"
            element={<ProjectDetail />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
