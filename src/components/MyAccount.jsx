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
    const userName = [{id: 0, label: "tickle122"}, {id: 1, label: "grumpy19"}, {id: 2, label: "happyamy2016"}, {id: 3, label: "cooljmessy"}, {id: 4, label: "weegembump"}, {id: 5, label: "jessjelly"}];

    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(userName);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id) => {
          selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
        }

    return(
        <div>
        <Header />
        <Nav />
        <div className='account-container'>
        <div className='greeting'>
        <h2>Hi there!<p>If you want to add comments, please login 🔒🧸</p></h2>
        </div>

        <form className='dropDown' action="">
        <select name="userName" id="" class="form-control">
          <option value="tickle122">tickle122</option>
          <option value="grumpy19">grumpy19</option>
          <option value="happyamy2016">happyamy2016</option>
          <option value="happyamy2016">cooljmessy</option>
          <option value="happyamy2016">weegembump</option>
          <option value="happyamy2016">jessjelly</option>
      </select>
      <button type="submit" className='loginBtn'>Login</button>
      </form>
    </div>
        <Footer />
        </div>
    );
}

export default MyAccount;