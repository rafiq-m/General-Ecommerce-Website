import { groupBy } from "lodash";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");

export default async (req, res) => {
    const { items, email } = req.body;
    
    const imp_items = items.map(({id, quantity}) => ({id, stockQuantity: quantity}));

    const groupedItems = Object.values(groupBy(items, "id"));

    const transformedItems = groupedItems.map((group) => ({
        description: group[0].description,
        quantity: group.length,
        price_data: {
            currency: "pkr",
            unit_amount: group[0].price * group[0].quantity * 100, // Still don't really know here why we should times by 100 🤔
            product_data: {
                name: group[0].name,
                images: [group[0].image],
            },
        },
    }));

    //Instead of sending an array of multiple similar values, just group them to save space in session
    const groupedImages = Object.values(
        groupBy(items.map((item) => path.basename(item.image)))
    ).map((group) => [group.length, group[0]]);


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA", "FR"], // RTFM!
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            items: JSON.stringify(imp_items),
        },
    });

    console.log("session created!", session.id);

    res.status(200).json({ id: session.id });
};
