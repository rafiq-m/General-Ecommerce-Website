import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MIN_RATING = 1;
const MAX_RATING = 5;

function Product({ id, name, price, description, categoryName, image, quantity }) {
    const dispatch = useDispatch();
    const [state_quantity, set_state_quantity] = useState(quantity);

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
    );

    const [hasSpecialSupport] = useState(Math.random() < 0.5);

    function addItemToBasket() {
        set_state_quantity(state_quantity-1);
        const product = {
            id,
            name,
            price,
            description,
            categoryName,
            quantity,
            image,
            rating,
            hasSpecialSupport,
        };
        dispatch(addToBasket(product));
    }

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10 growing-hover">
            <p className="absolute top-2 right-3 text-sm italic text-gray-400">
                {categoryName}
            </p>
            <Image src={image} width={200} height={200} objectFit="contain" />
            <h4 className="my-3 font-bold">{name}</h4>
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currency quantity={price} currency="PKR" />
            </div>

            {hasSpecialSupport && (
                <div className="flex items-center space-x-2 -mt-5 mb-5">
                    <img
                        loading="lazy"
                        className="w-12"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsmv6PDKJDYCZtYcizjN2Al9QRqIdIsBr1hg&usqp=CAU"
                        alt=""
                    />
                    <p className="text-xs text-gray-500">
                        Special Five year Warranty
                    </p>
                </div>
            )}
            {/* <div className="flex space-even absolute bottom-2 items-center space-x-10">
                <h1 className = "bg-blue-400 p-2 text-white rounded-full">Stock: {quantity}</h1> */}
                <button
                onClick={addItemToBasket}
                className={`mt-auto button ${
                    state_quantity <= 0 &&  
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed hover:from-gray-300"
                }`} 
                disabled={state_quantity <= 0}
                >
                    Add to basket - {state_quantity} remaining
                </button>
            {/* </div> */}
        </div>
    );
}

export default Product;
