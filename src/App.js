import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';


import Home from './components/Home';
import Topic from './components/Topic';
import SingleArticle from './components/SingleArticle';
import MyAccount from './components/MyAccount';



function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topic" element={<Topic />} />
        <Route path="/article/:articleId" element={<SingleArticle />} />
        <Route path="/account" element={<MyAccount />} />
        </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
