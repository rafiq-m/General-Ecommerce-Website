import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { useState } from "react";
import https from 'https'

export default function Home({ products }) {
    const [filteredProducts, setProducts] = useState(products);

    function filterProducts(searchText) {
        if(searchText === "HP OMEN" || searchText === "HP Spectre x360" || searchText === "HP Probook"){
            const matchedProducts = products.filter((product) =>
            product.categoryName == searchText
        );
        setProducts([...matchedProducts]);
        }
        else if (searchText === ""){
            setProducts(products);
        }
        else{
            const matchedProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setProducts([...matchedProducts]);
        }
        
    }

    return (
        <div className="bg-gray-100 ">
            <Head>
                <title>TecKnack</title>
            </Head>

            <Header onSearchValue={filterProducts} />

            <main className="max-w-screen-2xl mx-auto">
                <Banner />

                {filteredProducts.length > 0 ? (
                    <ProductFeed products={filteredProducts} />
                ) : (
                    <h1 className="text-center text-2xl py-4">
                         No matching products…
                    </h1>
                )}
            </main>
        </div>
    );
}

export async function getServerSideProps() {
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    const products = await fetch("https://localhost:5001/api/Products", {agent}).then(
        (res) => res.json()
    );
    console.log(products)
    return { props: { products } };
}
