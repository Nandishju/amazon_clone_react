import React from 'react'
import './Home.css';
import Product from './Product'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" 
                    alt="" 
                    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg"/>

                <div className="home__row">
                    <Product 
                        id="1122333"
                        title="The Four Winds: A Novel"
                        price={14.99}
                        image="https://m.media-amazon.com/images/I/91g+aK0nCnL._AC_UL640_FMwebp_QL65_.jpg"   
                        rating={4}   
                    /> 
                    <Product 
                        id="2345162"
                        title="The Book of Two Ways"
                        price={20.59}
                        image="https://m.media-amazon.com/images/I/51k93MYRLHL._AC_UL800_FMwebp_QL65_.jpg"   
                        rating={3}   
                    /> 
                   
                </div>
                <div className="home__row">
                    <Product 
                        id="454272"
                        title="Believe IT"
                        price={18.76}
                        image="https://m.media-amazon.com/images/I/71gPYk-AUmL._AC_UL800_FMwebp_QL65_.jpg"   
                        rating={5}   
                    /> 
                    <Product 
                        id="12342124"
                        title="The Testaments: A Novel"
                        price={11.99}
                        image="https://m.media-amazon.com/images/I/71yo6O-GhkL._AC_UL640_FMwebp_QL65_.jpg"   
                        rating={3}   
                    /> 
                     <Product 
                        id="32312134"
                        title="The Nickel Boys (Winner 2020 Pulitzer Prize for Fiction)"
                        price={11.99}
                        image="https://m.media-amazon.com/images/I/81JYu+PVg1L._AC_UL640_FMwebp_QL65_.jpg"   
                        rating={4}   
                    /> 
                </div>
                <div className="home__row">
                    <Product 
                        id="3212342"
                        title="How to Avoid a Climate Disaster: The Solutions We Have and the Breakthroughs We Need"
                        price={16.99}
                        image="https://m.media-amazon.com/images/I/81LBHG2-utL._AC_UL480_FMwebp_QL65_.jpg"   
                        rating={5}   
                    /> 
                </div>
            </div>
        </div>
    )
}

export default Home
