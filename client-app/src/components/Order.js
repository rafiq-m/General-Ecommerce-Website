import Currency from "react-currency-formatter";


function Order({ id, price, images, quantity, name }) {
    console.log({ id, price, images, quantity, name })
    return (
        <div className="relative border rounded-md">
            <div className="block sm:flex items-center sm:space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div className="mb-3 sm:mb-0">
                    <p className="font-bold text-xs">ORDER COMPLETED</p>
                </div>

                <div>
                    <p className="text-xs font-bold">Course Cost</p>
                    <p>
                        <span className="font-bold">
                            <Currency quantity={price} currency="PKR" />
                        </span>{" "}
                    </p>
                </div>

                <p className="absolute top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    Product No: {id}
                </p>
            </div>

            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    <div className="relative">
                        <img
                            src={images}
                            alt=""
                            className="h-20 object-contain sm:h-32"
                        />
                    </div>
                    <div className = "flex flex-col flex-1">
                        <p className="absolute top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-black-500">
                            Course Name: {name}
                        </p>
                        <p className="absolute top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-black-500">
                            Quantity: {quantity}
                        </p>
                        <p className="absolute p-2 border-2 top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-black-500">
                            Total Amount Paid: {quantity * price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
