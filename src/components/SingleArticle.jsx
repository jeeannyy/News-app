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
    const [deleteComment, setDeleteComment] = useState([]);
    const [countComment, setCountComment] = useState([]);

    const [sortByDate, setSortByDate] = useState([]);
    
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
    const PatchVote = (voteChange) => {
        axios
        .patch(`https://jeeanny.herokuapp.com/api/articles/${articleId}`,
        { 
            "inc_votes": voteChange
        })
    }
    const voteUp = () => {
        setVoteCounter(voteCounter + 1);
        PatchVote(1)
    };
    const voteDown = () => {
        setVoteCounter(voteCounter - 1);
        PatchVote(-1)
    };

       // Delete comment
       const deleteComments = (commentId) => {
        console.log(commentId,"<<<<<");
        axios
        .delete(`https://jeeanny.herokuapp.com/api/comments/${commentId}`)
        .then(()=>{
            alert("Your comment is deleted!");
        })
        .then(setCountComment(countComment - 1));
    }


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
    if(loading) return <div>🌀Loading🌀</div>

    return(
        <div>
        <Header />
        <Nav />
        <div className='singleArticle-container'>
        <div className='articleList-container-single'>
            <ul>
                <li className='articleList-singleArticle'>
                    <div key={articlesById.article_id}>
                    <h4>{articlesById.author}</h4>
                    <h4>{articlesById.created_at}</h4>
                    <h2>{articlesById.title}</h2>
                    <h4>{articlesById.body}</h4>
                    <div className='articleList-heart'>
                        <h4>💜 {voteCounter + articlesById.votes}</h4>
                        <h4>💬 {articlesById.comment_count}</h4>
                    </div>
                    </div>
                </li>
            </ul>
        </div>
        <div className='vote'>
        <button className='voteUp' onClick={voteUp}>🙂</button>
        <button className='voteDown' onClick={voteDown}>😕</button>
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


        <div className='commentsList'>
            {commentsById.map((comment) => {
                console.log(comment);
                return (
                    <div className='singleCommentList' key={comment.article_id}>
                <h2>{comment.author}</h2>
                <h3>{comment.body}<span className='deleteBtn' onClick={()=> {deleteComments(comment.comment_id)}}>❎</span></h3>
                </div> )}
            )}       
        </div>
        
        </div>

        <Footer />
        </div>
    );
}

export default SingleArticle;