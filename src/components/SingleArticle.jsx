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
import { response } from 'express';

const SingleArticle = () => {
    const [articlesById, setArticlesById] = useState([]);
    const [loading, setLoading] = useState(true);
    const [voteCounter, setVoteCounter] = useState(0);
    const [addComment, setAddComment] = useState("");
    const [addedComments, setAddedComments] = useState([]);
    const [commentsById, setCommentsById] = useState([]);
    const [postComment, setPostComment] = useState(null);
    
    const {articleId} = useParams();

    
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
    // useEffect(() => {
    //     setLoading(true);
    //     fetch(`https://jeeanny.herokuapp.com/api/articles/${articleId}/comments`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         setCommentsById(data.articles);
    //         setLoading(false);
    //     });
    // }, [articleId]);

    

    // Vote 
    const voteUp = () => {
        setVoteCounter(voteCounter + 1);
    };
    const voteDown = () => {
        setVoteCounter(voteCounter - 1);
    };

    // Add Comment
    const onChange = (event) => setAddComment(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        if (addComment === ""){
            return;
        }
        setAddedComments((currentArray) => [addComment, ...currentArray]);
        setAddComment("");
    };

    console.log(commentsById, "<<<<<<<<<<<<")


    // Post new comments
    useEffect(()=>{
        axios.get(`https://jeeanny.herokuapp.com/api/articles/${articleId}/comments`)
        .then((response) => {
            setPostComment(response.data);
        })
    }, [articleId]);

    const CreatePost = () => {
        axios
        .post(`https://jeeanny.herokuapp.com/api/articles/${articleId}/comments`, 
        {
            username: "Hiii",
            body: "This is a new post"
        })
        .then((response) => {
            setPostComment(response.data);
        });
    }

    if(!postComment) return "No Post!";


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
            </div>
            </li>
            </ul>
        ))}       
        </div>


        <div>
            <h1>{postComment.title}</h1>
            <h1>{postComment.body}</h1>
            <button onClick={CreatePost}>Submit</button>
        </div>

        <Footer />
        </div>
    );
}

export default SingleArticle;