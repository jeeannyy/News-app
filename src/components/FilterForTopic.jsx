import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import { fetchArticles, fetchArticlesByTopic } from "../utils/api";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


const FilterForTopic = () => {



    return(
  <div className='categories_container'>
    <ul className='categories_topic'>
    <div>
        <button><Link to={"/topic/cooking"}>Cooking</Link></button>
        <button><Link to={"/topic/coding"}>Coding</Link></button>
        <button><Link to={"/topic/football"}>Football</Link></button>
        </div>

    </ul>
  </div>
    );
}

export default FilterForTopic;