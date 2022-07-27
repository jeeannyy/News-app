import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import { fetchArticles, fetchArticlesByTopic } from "../utils/api";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';



import Header from './Header';
import Nav from './Nav';
import FilterForDetail from './FilterForDetail';
import Footer from './Footer';

import '../styles/Header.css';
import '../styles/Nav.css';
import '../styles/FilterForDetail.css';
import '../styles/Footer.css';



const Topic = () => {
    const [articlesByTopic, setArticlesByTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    const {topic} = useParams();
    


    useEffect(() => {
        setLoading(true);
        fetch(`https://jeeanny.herokuapp.com/api/articles?sort_by=topic&topic=${topic}`)
        .then((response) => response.json())
        .then((data) => {
            setArticlesByTopics(data.articles);
            setLoading(false);
        });
    }, [topic]);

    if(loading) return <div>Loading...</div>
    console.log("hi");

    return(
        <div>
        <Header />
        <Nav />
        <FilterForDetail />
    
        <div className='articleList-container'>
        {articlesByTopic.map((article) => (
                <ul>
                <li className='articleList-single'>
            <div key={article.article_id}>
            <h4>{article.author}</h4>
            <h4>{article.created_at}</h4>
            <h2>{article.title}</h2>
            <h4>{article.body}</h4>
            <div className='articleList-heart'>
            <h4>💜 {article.comment_count}</h4>
            <h4>💬 {article.votes}</h4>
            </div>
            </div>
            </li>
            </ul>
        ))}
        </div>
       
        <Footer />
        </div>
          );
}

export default Topic;