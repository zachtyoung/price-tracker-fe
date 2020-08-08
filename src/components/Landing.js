import React from 'react'
import the from '../assets/the.svg'
import amazon from '../assets/amazon-i.svg'
import pricetracker from '../assets/pricetracker.svg'
import revenue from '../assets/rev.svg'
import {Link }from "react-router-dom";

export default function Landing() {
    return (
        <div className='landing'>
            <div className='landing-wrap'>
                <div className='landing-left'>
                    <div className='left-top'>
                        <img className='img-1'src={the}></img>
                        <img className='img-2'src={amazon}></img>
                        <img className='img-3'src={pricetracker}></img>
                    </div>
                    <div className='left-bottom'>
                        <h1>The products you love</h1>
                        <h1>At the prices you want</h1>
                        <Link to='/login'><button className='landing-btn'>Get Started</button></Link>
                    </div>
                </div>
                <div className='landing-right'>
                    <img className='landing-img' src={revenue}></img>
                </div>
            </div>
        </div>
    )
}
