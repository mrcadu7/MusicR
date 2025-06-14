import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import NewHome from './pages/NewHome';
import Playlists from './pages/Playlists';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage';
import PlaylistCreate from './pages/PlaylistCreate';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Container from './layout/Container';
import Reviews from './pages/Reviews';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewHome/>} />
        <Route path="/playlist" element={
          <>
            <Navbar/>
            <Container customClass="min-height">
              <Playlists/>
            </Container>
            <Footer/>
          </>
        } />
        <Route path="/playlist/:playlistId" element={
          <>
            <Navbar/>
            <Container customClass="min-height">
              <PlaylistDetailsPage />
            </Container>
            <Footer/>
          </>
        } />
        <Route path="/playlist/create" element={
          <>
            <Navbar/>
            <Container customClass="min-height">
              <PlaylistCreate />
            </Container>
            <Footer/>
          </>
        } />
        <Route path='/reviews' element={
          <>
            <Navbar/>
            <Container customClass="min-height">
              <Reviews />
            </Container>
            <Footer/>
          </>
        } />
      </Routes>
    </Router>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);

export default App;