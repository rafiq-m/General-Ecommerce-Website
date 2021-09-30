import { getSession, useSession } from "next-auth/client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Order from "../components/Order";
import { useRouter } from "next/router";
import axios from "axios";
import https from "https";

function Orders(props) {
    const [session] = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState([]);

    //jab pehli bar component mount hoga
    useEffect(() => {
        var p = [];
        if (props.orders_unprocessed) {
            props.orders_unprocessed.map((order) => {
                axios.get(`https://localhost:5001/api/Products/${order.pId}`).then((resp) => {
                    var object = resp.data;
                    object.quantity = order.quantity;
                    object.number = order.id;
                    p.push(object);
                })
                setOrders(p);
            })
        }
    }, [])




    return (
        <div>
            <Header />

            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-blue-400">
                    Your orders
                </h1>
                {console.log(orders)}
                {session ? (
                    <h2 className="text-xl">
                        {orders && orders.length > 0 ? (
                            <>
                                {orders.length} Order{orders.length > 1 && "s"}
                            </>
                        ) : (
                            <>
                                You don't have any order yet. Go visit the{" "}
                                <button
                                    onClick={() => router.push("/")}
                                    className="link text-blue-400 underline hover:no-underline">
                                    Homepage Store
                                </button>{" "}
                                to purchase some items.
                            </>
                        )}
                    </h2>
                ) : (
                    <h2>Please sign in to see your orders.</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map((order) => (
                        <Order
                            key={order.number}
                            id={order.id}
                            price={order.price}
                            images={order.imagePath}
                            quantity={order.quantity}
                            name={order.name}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Orders;

export async function getServerSideProps(context) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const session = await getSession(context);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    if (!session) {
        return { props: {} };
    }
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    const orders_unprocessed = await axios.get(`https://localhost:5001/api/usersorder/${session.user.email}`, { agent })
        .then((resp) => resp.data);
    return { props: { orders_unprocessed } };
}