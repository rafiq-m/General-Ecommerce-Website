import React from "react";
import Product from "./Product";

function ProductFeed({ products }) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-10 mx-auto">
            {console.log(products)}
            {products
                .slice(0, 4)
                .map(({ id, name, price, description, categoryName, image, quantity }) => (
                    <Product
                        key={id}
                        id={id}
                        name={name}
                        price={price}
                        description={description}
                        categoryName={categoryName}
                        image={image}
                        quantity = {quantity}
                    />
                ))}

            {products.length > 0 && (
                <img
                    src="https://i.postimg.cc/1t772qxQ/5712637.jpg" //https://i.postimg.cc/W1mpM2rV/5076026.jpg"
                    alt=""
                    className="md:col-span-full m-auto"
                />
            )}

            {/* <div className="md:col-span-2">
                {products
                    .slice(4, 5)
                    .map(
                        ({
                            id,
                            name,
                            price,
                            description,
                            categoryName,
                            image,
                            quantity,
                        }) => (
                            <Product
                                key={id}
                                id={id}
                                name={name}
                                price={price}
                                description={description}
                                categoryName={categoryName}
                                image={image}
                                quantity={quantity}
                            />
                        )
                    )}
            </div> */}

            {products
                .slice(4, products.length)
                .map(({ id, name, price, description, categoryName, image, quantity }) => (
                    <Product
                        key={id}
                        id={id}
                        name={name}
                        price={price}
                        description={description}
                        categoryName={categoryName}
                        image={image}
                        quantity = {quantity}
                    />
                ))}
        </div>
    );
}

export default ProductFeed;
