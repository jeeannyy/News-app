import React from 'react';
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


const FilterForDetail=({topic})=>{
    return(
        <div className='filter-detail'>
        <button><Link className="likesLink" to={`/topic/${topic}?sort_by=votes`}>Likes</Link></button>
        <button><Link className="commentsLink" to={`/topic/${topic}?sort_by=comment_count`}>Comments</Link></button>
        <button><Link className="dateLink" to={`/topic/${topic}?sort_by=created_at`}>Latest</Link></button>
        {/* <button><Link className="ascendingLink" to={`/topic/${topic}?sort_by=order`}>A</Link></button> */}
        </div>
    );
}

export default FilterForDetail;