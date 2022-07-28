import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';


import Home from './components/Home';
import Topic from './components/Topic';
import SingleArticle from './components/SingleArticle';



function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topic" element={<Topic />} />
        <Route path="/article/:articleId" element={<SingleArticle />} />
        </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
