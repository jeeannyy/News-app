import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams, useNavigate} from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

import '../styles/Header.css';
import '../styles/Nav.css';
import '../styles/Footer.css';
import '../styles/Account.css';


const MyAccount = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState({});
    const [userImg, setUserImg] = useState("");

        useEffect(() => {
            setLoading(true);
            fetch(`https://jeeanny.herokuapp.com/api/users`)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data.users);
                console.log(data.users,"<<<<");
                setLoading(false);
            });
        }, []);

        function loginSuccess(event){
            alert('🎉 Welcome! 🎉');
            event.defaultPrevented();

            
        };

    
        if(loading) return <div>Loading...</div>


    return(
        <div>
        <Header />
        <div className='account-container'>
        <div className='greeting'>
        <h2>Choose your Avatar! 🧌</h2> 
       
        </div>
{/* 
        <form className='dropDown' action="">
        <select onChange={handleGreeting} value={userImg} name="userName" id="" class="form-control" placeholder='Choose your Avatar🔒'>
          <option value="tickle122">tickle122</option>
          <option value="grumpy19">grumpy19</option>
          <option value="happyamy2016">happyamy2016</option>
          <option value="cooljmessy">cooljmessy</option>
          <option value="weegembump">weegembump</option>
          <option value="jessjelly">jessjelly</option>
      </select>
      <button type="submit" className='loginBtn' onClick={loginSuccess}>Login</button>
      </form> */}
    </div>

    <div className='userImg-container'>
        {users.map((user) => (
            <ul className='userImgs'>
            <li>
                <div key={user.username}>
               <button onClick={loginSuccess}><img src={`${user.avatar_url}`} alt="image" className='avatarImg'></img></button> 
                
                </div>
            </li>
            </ul>
        ))}
        </div>


        <Footer />
        </div>
    );
}

export default MyAccount;