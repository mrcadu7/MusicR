import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';


function App() {
    return (
      <div>
        <h1>
            <Home/>
        </h1>
      </div>
    );
  }

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);

export default App;