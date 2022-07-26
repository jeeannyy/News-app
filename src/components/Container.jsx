import {useState, useEffect} from 'react';
import FilterGroup from './FilterGroup';
import ArticleList from './ArticleList';

const Container = () => {
    return(
        <div>
   <FilterGroup />
   <ArticleList />
   </div>
    );
}

export default Container;