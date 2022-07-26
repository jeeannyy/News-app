import {useState, useEffect} from 'react';


const Categories = () => {
    return(
  <div>
    <ul>
        <button>Cooking</button>
        <button>Coding</button>
        <button>Football</button>
    </ul>
    <ul>
        <button>Likes</button>
        <button>Comments</button>
        <button>Latest</button>
        <button>A to Z</button>
    </ul>
  </div>
    );
}

export default Categories;