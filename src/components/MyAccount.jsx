import React, {useState, useEffect} from 'react';

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

        useEffect(() => {
            setLoading(true);
            fetch(`https://news-backend-i2ta.onrender.com/api/users`)
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