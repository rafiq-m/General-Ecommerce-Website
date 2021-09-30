import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { groupBy } from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
    const items = useSelector(selectItems);
    const [session] = useSession();

    async function createCheckoutSession() {
        const stripe = await stripePromise;

        // Call the backend to create a checkout session...
        const checkoutSession = await axios.post(
            "/api/create-checkout-session",
            {
                items,
                email: session.user.email,
            }
        );

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    }

    const totalItem = () => {
        return items.reduce((initialValue, item) => item.quantity + initialValue, 0)
    }

    const totalCost = () => {
        var total_price = 0
        items.map((item) => {
            total_price += item.quantity * item.price
        })
        return total_price
    }

    const groupedItems = Object.values(groupBy(items, "id"));
    return (
        <div className="bg-gray-100">
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://images.pexels.com/photos/5912589/pexels-photo-5912589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        width={1020}
                        height={250}
                    />

                    <div className="flex flex-col p-5 space-y-50 bg-white">
                        <h1
                            className={`text-3xl ${items.length > 0 ? "border-b pb-4" : "pb-2"
                                }`}>
                            {items.length === 0
                                ? "Your TecKnack Basket is empty."
                                : "Shopping Basket"}
                        </h1>
                        {groupedItems.map((group, i) => (
                            <CheckoutProduct
                                id={group[0].id}
                                name={group[0].name}
                                rating={group[0].rating}
                                price={group[0].price}
                                description={group[0].description}
                                categoryName={group[0].categoryName}
                                image={group[0].image}
                                hasSpecialSupport={group[0].hasSpecialSupport}
                                quantity={group[0].quantity}
                            />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    <h2 className="whitespace-nowrap">
                        Subtotal ({totalItem()} items):{" "}
                        <span className="font-bold">
                            <Currency quantity={totalCost()} currency="PKR" />
                        </span>
                    </h2>

                    <button
                        role="link"
                        onClick={createCheckoutSession}
                        disabled={!session}
                        className={`button mt-2 ${!session &&
                            "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300"
                            }`}>
                        {!session
                            ? "Sign in to checkout"
                            : "Proceed to checkout"}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Checkout;
