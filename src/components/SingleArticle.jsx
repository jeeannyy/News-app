import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import { fetchArticles, fetchArticlesByTopic } from "../utils/api";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';



import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

import '../styles/Header.css';
import '../styles/Nav.css';
import '../styles/Footer.css';

const SingleArticle = () => {
    const [articlesById, setArticlesById] = useState([]);
    const [loading, setLoading] = useState(true);

    const {articleId} = useParams();
    // console.log(articleId);

    useEffect(() => {
        setLoading(true);
        fetch(`https://jeeanny.herokuapp.com/api/articles/${articleId}`)
        .then((response) => response.json())
        .then((data) => {
            setArticlesById(data.article);
            setLoading(false);
        });
    }, [articleId]);



    if(loading) return <div>Loading...</div>

console.log(articlesById);
console.log(articlesById.title);

    return(
        <div>
        <Header />
        <Nav />

        <div className='articleList-container'>
                <ul>
                <li className='articleList-single'>
            <div key={articlesById.article_id}>
            <h4>{articlesById.author}</h4>
            <h4>{articlesById.created_at}</h4>
            <h2>{articlesById.title}</h2>
            <h4>{articlesById.body}</h4>
            <div className='articleList-heart'>
            <h4>💜 {articlesById.comment_count}</h4>
            <h4>💬 {articlesById.votes}</h4>
            </div>
            </div>
            </li>
            </ul>
        </div>


        <Footer />
        </div>
    );
}

export default SingleArticle;