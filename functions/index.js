const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51IS4abLbH6VaedCH6J1Phv64y2y2maINvCUO6YEoDc3yFyby6BegT3UoYtdWCCNuJIrg93SBd9Z4eiNXhZTRQiSe00ucrl41ou')

// API 
const app = express();

// API Config

app.use(cors({origin:true}));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Received!!!!", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
    });

    // OK - Created
    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    });

})

// Listen command

exports.api = functions.https.onRequest(app);

// End point
// http://localhost:5001/clone-5a217/us-central1/api