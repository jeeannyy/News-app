import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


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
    const queryParams = new URLSearchParams(window.location.search);
    const sort = queryParams.get("sort_by");
    const {topic} = useParams();
    
console.log(sort, "<<<<<");

    useEffect(() => {
        setLoading(true);
        fetch(sort ? `https://news-backend-i2ta.onrender.com/api/articles?topic=${topic}&sort_by=${sort}` : `https://news-backend-i2ta.onrender.com/api/articles?topic=${topic}`)
        .then((response) => response.json())
        .then((data) => {
            setArticlesByTopics(data.articles);
            setLoading(false);
        });
    }, [sort, topic]);

    if(loading) return <div>Loading...</div>
    console.log("hi");

    return(
        <div>
        <Header />
        <Nav />
        <FilterForDetail 
            topic = {topic}
        />
        
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
            <h4>💜 {article.votes}</h4>
            <h4>💬 {article.comment_count}</h4>
            <h4><Link className="readmore" to={`/article/${article.article_id}`}>➡️</Link></h4>
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
