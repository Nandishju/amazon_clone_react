import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import CurrenctFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom';
import { getBasketTotal } from './reducer';
import './Payment.css'
import { useStateValue } from './StateProvider'
import axios from './axios'

function Payment() {
    
    const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState("true");


    useEffect(() => {
      
        const getClientSecret = async () => {
            const response = await axios ({
                method:"post",
                url: `/payments/create?total= ${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket])

    console.log("THE SECRET >>>> ", clientSecret)

    const handleSubmit  = async(event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(setClientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // payemntIntent = payment confirmation

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('./orders')

        })
        
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error);
    }

    return (
        <div className="payment">
           <div className="payment__container">
               <h1>
                   Checkout (
                       <Link to="/checkout">
                           {basket?.length} Items
                       </Link>
                   )
               </h1>
                <div className="payment__section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                    {user ?
                        <p>
                            {user.email}
                        </p> :
                            <p>
                            Hello, Guest
                        </p>
                    }
                       
                        <p>123 India,</p>
                        <p>Karnataka, 577501</p>
                    </div>
                </div>
               
                <div className="payment__section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map (item => (
                            <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating= {item.rating}
                        />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                       <form onClick={handleSubmit}>
                           <CardElement onChange={handleChange} />

                           <div className="payment__priceContainer">
                           <CurrenctFormat 
                                renderText={(value) => (
                                    <>
                                        <p>
                                           Order Total ({basket.length} items): <strong> {value}</strong>
                                        </p>
                                    </>
                                )} 
                                decimalScale = {2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator = {true}
                                prefix = {" $ "}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                                </button>
                           </div>

                           {error && <div>{error}</div>}
                       </form>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Payment
