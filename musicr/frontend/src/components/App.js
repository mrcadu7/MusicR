import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import Playlists from './pages/Playlists';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage';
import PlaylistCreate from './pages/PlaylistCreate';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Container from './layout/Container';


function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/playlist" element={<Playlists/>} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetailsPage />} />
          <Route path="/playlist/create" element={<PlaylistCreate />} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);

export default App;