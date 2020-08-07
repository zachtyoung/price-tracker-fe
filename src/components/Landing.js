import React from 'react'

export default function Landing() {
    return (
        <div className='landing'>
            <nav>Price Tracker</nav>
            <div className='landing-wrap'>
                <div className='landing-left'>
                    <div className='left-top'>
                    <h1>The</h1>
                    <h1>Amazon</h1>
                    <h1>PriceTracker</h1>
                    </div>
                    <div className='left-bottom'>
                        <h1>The products you love</h1>
                        <h1>At the prices you want</h1>
                        <button>Learn More</button>
                    </div>
                </div>
                <div className='landing-right'>
                    <h1>Image</h1>
                </div>
            </div>
        </div>
    )
}
