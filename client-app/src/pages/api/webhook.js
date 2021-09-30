import { buffer } from "micro"; 
const axios = require('axios');
const https = require('https');


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET; // WHERE IS THIS?

const fulfillOrder = async (session) => {

    
    const whole_data = JSON.parse(session.metadata.items);
    console.log(whole_data);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;



    console.log("Important data for next request", whole_data);
    axios.post("https://localhost:5001/api/Products/updateStock", whole_data).
    then((resp) => {
        console.log("PRODUCT MINUSED SUCCESFULLY!");
    }).catch((err)=>{
        console.error(err.message);
    });

    return whole_data.map((data) => {
        axios.post("https://localhost:5001/api/usersorder", {PId: data.id, Quantity: data.stockQuantity, Email: session.metadata.email}).
        then((resp) => {
            console.log("Product added to order Table : ");
        }).catch((err) => { 
            console.error(err.message);
        })
    })
        

};

export default async (req, res) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;


        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sig,
                endpointSecret
            );
        } catch (err) {
            console.log("ERROR", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        // Handle the checkout.session.completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Fulfill the order...
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) =>
                    res.status(400).send(`Webhook Error: ${err.message}`)
                );
        }
    }
};

export const config = {
    api: {
        bodyParser: false, // Useless for webhooks
        externalResolver: true,
    },
};
