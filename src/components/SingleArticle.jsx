import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

import '../styles/Header.css';
import '../styles/Nav.css';
import '../styles/SingleArticle.css';
import '../styles/Footer.css';

const SingleArticle = () => {
    const [articlesById, setArticlesById] = useState([]);
    const [loading, setLoading] = useState(true);
    const [voteCounter, setVoteCounter] = useState(0);
    const [addComment, setAddComment] = useState("");
    const [addedComments, setAddedComments] = useState([]);
    const [commentsById, setCommentsById] = useState([]);

    // SortBy
    const [sortByDate, setSortByDate] = useState([]);
    const [sortByVote, setSortByVote] = useState([]);
    const [sortByComment, setSortByComment] = useState([]);
    const [ascending, setAscending] = useState([]);
    
    const {articleId} = useParams();
    const {createdDate} = useParams();

    
    // Get article ID
    useEffect(() => {
        setLoading(true);
        fetch(`https://jeeanny.herokuapp.com/api/articles/${articleId}`)
        .then((response) => response.json())
        .then((data) => {
            setArticlesById(data.article);
            setLoading(false);
        });
    }, [articleId]);


    // Get comments list
    useEffect(() => {
        setLoading(true);
        fetch(`https://jeeanny.herokuapp.com/api/articles/${articleId}/comments`)
        .then((response) => response.json())
        .then((data) => {
            setCommentsById(data.articles);
            setLoading(false);
        });
    }, [articleId]);


    // Vote 
    const voteUp = () => {
        setVoteCounter(voteCounter + 1);
    };
    const voteDown = () => {
        setVoteCounter(voteCounter - 1);
    };


    // Post new comments
    const CreatePost = (comment) => {
        axios
        .post(`https://jeeanny.herokuapp.com/api/articles/${articleId}/comments`, 
        {
            "username": comment.author,
            "body": comment.body
        })
    }

    const onChange = (event) => setAddComment(event.target.value);
    const onSubmit = (event) => {
        const comment = {
            "author": "jessjelly",
            "body": addComment
        }
        event.preventDefault();
        if (addComment === ""){
            return;
        }
        setCommentsById((currentArray) => [comment, ...currentArray]);
        CreatePost((comment))
        setArticlesById((article) => {return {...article, comment_count:article.comment_count+1}})
        setAddComment("");
    };

    // Delete comment

    const DeletePost = () => {
        axios
        .delete(`https://jeeanny.herokuapp.com/api/comments/:comment_id`)
        .then(()=>{
            alert("Post deleted!");
            setAddComment(null)
        })
    }

    // Sort by Date
    useEffect(() => {
        setLoading(true);
        fetch(`https://jeeanny.herokuapp.com/api/articles?sort_by=created_at`)
        .then((response) => response.json())
        .then((data) => {
            setSortByDate(data.articles);
            setLoading(false);
        });
    }, [createdDate]);


    // Loading
    if(loading) return <div>Loading...</div>

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
                        <h4>💜 {voteCounter}</h4>
                        <h4>💬 {articlesById.comment_count}</h4>
                    </div>
                    </div>
                </li>
            </ul>
        </div>
            <div className='vote'>
            <h3 className='voteUp' onClick={voteUp}>🙂</h3>
            <h3 className='voteDown' onClick={voteDown}>😕</h3>
            </div>

            <div>
                <form onSubmit={onSubmit}>
                <input 
                className='commentInput'
                onChange={onChange}
                value={addComment}
                type="text"
                placeholder='Add a comment' />
                <button className='commentBtn'>Submit</button>
                </form>
            </div>
            <ul className='addedComments'>
                    {addedComments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>


        <div className='comments'>
        {commentsById.map((comment) => (
                <ul>
                <li className='articleList-single'>
            <div key={comment.article_id}>
            <h2>{comment.author}</h2>
            <h4>{comment.body}</h4>
            <h4>🗑</h4>
            </div>
            </li>
            </ul>
        ))}       
        </div>

{/* Sort by */}
        {/* <div className='articleList-container'>
        {sortByDate.map((article) => (
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
        </div> */}
        <Footer />
        </div>
    );
}

export default SingleArticle;