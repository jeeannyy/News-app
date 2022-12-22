import React  from 'react';
import { Link } from 'react-router-dom';


const FilterForTopic = () => {


    return(
  <div className='filter-topics'>
        <button><Link className="cookingLink" to={"/topic/cooking"}>Cooking</Link></button>
        <button><Link className="codingLink" to={"/topic/coding"}>Coding</Link></button>
        <button><Link className="footballLink" to={"/topic/football"}>Football</Link></button>
  </div>
    );
}

export default FilterForTopic;