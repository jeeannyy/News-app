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
import '../styles/SingleArticle.css';
import '../styles/Footer.css';

const SingleArticle = () => {
    const [articlesById, setArticlesById] = useState([]);
    const [loading, setLoading] = useState(true);
    const [voteCounter, setVoteCounter] = useState(0);
    const [addComment, setAddComment] = useState("");
    const [addedComments, setAddedComments] = useState([]);
    
    const {articleId} = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`https://jeeanny.herokuapp.com/api/articles/${articleId}`)
        .then((response) => response.json())
        .then((data) => {
            setArticlesById(data.article);
            setLoading(false);
        });
    }, [articleId]);

    const voteUp = () => {
        setVoteCounter(voteCounter + 1);
    };
    const voteDown = () => {
        setVoteCounter(voteCounter - 1);
    };

    const onChange = (event) => setAddComment(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        if (addComment === ""){
            return;
        }
        setAddedComments((currentArray) => [addComment, ...currentArray]);
        setAddComment("");
    };

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
            <h4>💜 {voteCounter}</h4>
            <h4>💬 {articlesById.comment_count}</h4>
            {/* <h4>💬 {addedComments.length}</h4> */}
            </div>
            </div>
            </li>
            </ul>
        </div>
            <div className='vote'>
            <h3 className='voteUp' onClick={voteUp}>🙂</h3>
            <h3 className='voteDown' onClick={voteDown}>😕</h3>
            </div>

            <div className='commentSection'>
                {/* <h4>Leave your comment! {addedComments.length}</h4> */}
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


        <Footer />
        </div>
    );
}

export default SingleArticle;