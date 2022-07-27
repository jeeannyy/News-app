import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

 

import Header from './Header';
import Nav from './Nav';
import FilterForTopic from './FilterForTopic';
import ArticleList from './ArticleList';
import Footer from './Footer';

import '../styles/Header.css';
import '../styles/Nav.css';
import '../styles/FilterForTopic.css';
import '../styles/ArticleList.css';
import '../styles/Footer.css';



function Home() {
  return (
   
    <div>
      <Header />
      <Nav />
      <FilterForTopic />
    <ArticleList />
      <Footer />
    </div>
    

  );
}

export default Home;
