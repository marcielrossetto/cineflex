import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sessions from './pages/Sessions';
import Seats from './pages/Seats';
import Success from './pages/Success';
import Menu from './pages/Menu';  

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
  }
`;

function App() {
  return (
    <div>
      {}
      <Menu />

      {}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessoes/:idFilme" element={<Sessions />} />
        <Route path="/assentos/:idSessao" element={<Seats />} />
        <Route path="/sucesso" element={<Success />} />
        
      </Routes>
    </div>
  );
}

export default App;
