import {useState, useEffect} from 'react';
import ArticleCard from './ArticleCard';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';


const ArticleList = () => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState({});
    const {article_id} = useParams();


    useEffect(()=>{
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
       <div>
        {articles.map((article) => (
            <div key={article_id}>
            <h4>{article.author}</h4>
            <h4>{article.created_at}</h4>
            <h4>{article.title}</h4>
            <h4>{article.body}</h4>
            <h4>{article.comment_count}</h4>
            <h4>{article.votes}</h4>
            </div>

        ))}
        </div>
)};

export default ArticleList;

