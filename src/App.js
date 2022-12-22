import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './components/Home';
import Topic from './components/Topic';
import SingleArticle from './components/SingleArticle';
import MyAccount from './components/MyAccount';



function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/News-app" element={<Home />} />
        <Route path="/topic/:topic" element={<Topic />} />
        <Route path="/article/:articleId" element={<SingleArticle />} />
        <Route path="/account" element={<MyAccount />} />
        </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
