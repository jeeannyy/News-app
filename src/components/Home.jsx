// import {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';

// const Home = () => {
//     const [loading, setLoading] = useState(true);


//     useEffect(()=>{
//    setLoading(true);
//         fetch(`https://jeeanny.herokuapp.com/api`)
//         .then((response) => response.json())
//         .then((json)=>console.log(json));
        
//     },[])

//     if(loading) return <div>Loading...</div>
//     return(
        
//         <article>
//             <h2>hiiiii</h2>
//         </article>
//     );
// }

// export default Home;