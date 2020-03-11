import React, {useEffect, useState} from 'react';
import account from '../assets/account.svg'
import axios from 'axios'
import {AlertIcon} from './AlertIcon'
import {NoAlertIcon} from './NoAlertIcon'
import { useHistory } from 'react-router-dom'

export const Navbar = (props) => {
    const userID = localStorage.getItem("priceUserID")
    let history = useHistory()
    const [noti, setNoti] = useState(true)

    return (
        <div className="nav-wrap">
        <div><h1>Amazon<p>Price Tracker</p></h1></div>
        
        {props.isLoggedIn? 
        <>
        <div className="products">Watchlist: {props.numPro}</div> 
        <div className="nav-user">
            <button className='notify-btn' title='All Notifications' onClick={() => {
                axios.put(`https://react-price-tracker.herokuapp.com/users/${userID}`,{"all_notifications":!noti})
                .then(res =>{
                    setNoti(!noti)
                })
                }}>{noti?<AlertIcon fill={'#FF9900'}/>:<NoAlertIcon fill={'#fff'}/>}</button>
            <div className='user-icon-wrap'><img className="nav-icon" src={account}></img>{props.thing}</div>
            <button className="logout" onClick={()=> {
                localStorage.removeItem("priceUserID")
                localStorage.removeItem("priceUserName")
                localStorage.removeItem("priceToken")
                props.setIsLoggedIn(false)
                history.push("/login");
                
        }}>Logout</button>
        </div>
        </>
        : null}
        
       

        
        </div>
    )
  };