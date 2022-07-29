import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



const ArticleList = () => {
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetch(`https://jeeanny.herokuapp.com/api/articles`)
        .then((response) => response.json())
        .then((data) => {
            setArticles(data.articles);
            setLoading(false);
        });
    }, []);

    if(loading) return <div>Loading...</div>

    return(
       <div className='articleList-container'>
        {articles.map((article) => (
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
    );
        }

export default ArticleList;

