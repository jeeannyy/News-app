//import component
import Header from './components/Header';
import Nav from './components/Nav';
import Container from './components/Container';
import Footer from './components/Footer';

// import Styling
import '../src/styles/Header.css';
import '../src/styles/Nav.css';
import '../src/styles/Footer.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
   
    <div>
      <Header />
      <Nav />
      <Container />
      <Footer />
    </div>
    

  );
}

export default App;
