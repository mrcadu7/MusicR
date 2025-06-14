import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import NewHome from './pages/NewHome';
import Playlists from './pages/Playlists';
import PlaylistDetailsPage from './pages/PlaylistDetailsPage';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Container from './layout/Container';
import Reviews from './pages/Reviews';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewHome/>} />        <Route path="/playlist" element={<Playlists/>} />        <Route path="/playlist/:playlistId" element={
          <>
            <Navbar/>
            <Container customClass="min-height">
              <PlaylistDetailsPage />
            </Container>
            <Footer/>
          </>
        } />
        <Route path='/reviews' element={<Reviews />} />
      </Routes>
    </Router>
  );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);

export default App;