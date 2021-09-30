import React, { useState, useEffect } from 'react';
import Header from "../components/Header"
import https from 'https'
import axios from 'axios';


export default function addProduct({ products }) {

    const [selectValue, setselectValue] = useState("");
    const [categories, setCategories] = useState();
    const [product, setProduct] = useState({});


    const handleSelectValue = (e) => {
        e.preventDefault();
        setselectValue(e.target.value);
        var temp = product;
        temp.categoriesId = e.target.value;
        setProduct(temp)
        console.log(product)
    }

    const submitToDataBase = async () => { 
        //Add product to database

        const instance = axios.create({
            httpsAgent: new https.Agent({  
              rejectUnauthorized: false
            })
          });
          let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          }
        console.log("Add to product initiated: ", product);
        return await instance.post("https://localhost:5001/api/products/", product, axiosConfig).then((resp) => {
            console.log("Product Added Successfully!", resp);
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleImage = (e) => {
        // e.preventDefault();
        // const temp_file = e.target.files[0];
        // const reader = new window.FileReader(temp_file);
        // reader.readAsArrayBuffer(temp_file)
        // reader.onloadend = () => {

        //     console.log("Buffer ki cheezen", Buffer(reader.result))
        //     var temp = product;
        //     temp.image = Buffer(reader.result);
        //     setProduct(temp);
        // }
        // console.log(product);

        e.preventDefault();
        let image_file = e.target.files[0];
        console.log(image_file);
        const reader = new window.FileReader(image_file);
        reader.onload = x => {
            console.log("Buffer ki cheezen", Buffer(x.target.result))
            var temp = product;
            temp.image = Buffer(x.target.result);
            setProduct(temp);
        }
        reader.readAsDataURL(image_file);
        console.log(product);
    }

    const handleChange = (e) => {
        var temp = product;
        temp[e.target.id] = e.target.value;
        setProduct(temp);
        console.log(product)

    }


    useEffect(() => {
        var final_ans = []
        var final_ans2 = []
        console.log(products)
        products.map((product) => {
            if (!final_ans[product.categoryName]) {
                console.log(product.categoryName)
                final_ans[product.categoryName] = 1;
                final_ans2.push({ name: product.categoryName, id: product.categoryId });
            }
        })
        setCategories(final_ans2)
        setselectValue(final_ans2[0].id);
        var temp = product;
        temp.categoriesId = final_ans2[0].id;
        setProduct(temp);
        console.log("Method ke andar he : ", final_ans2)
        console.log(product)
    }, [])
    return (
        <div>
            <Header />


            <div
            //  className="flex justify-center items-center h-screen w-full bg-blue-200"
             >
                <div 
                className=" bg-white rounded shadow-2xl p-8 m-4"
                >
                    <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Add A Product</h1>
                    <form className = "lg:flex max-w-screen-2xl mx-auto" action="/" method="post">
                        <div className = "flex mx-4 flex-grow flex-col ">
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-md text-gray-900" htmlFor="Name">Product Name</label>
                                <input className="border py-2 px-3 text-grey-800" type="text" name="Name" onChange = {handleChange} id="Name"></input>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-md text-gray-900" htmlFor="Price">Price</label>
                                <input className="border py-2 px-3 text-grey-800" type="text" name="Price" onChange = {handleChange} id="Price"></input>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-md text-gray-900" htmlFor="stockQuantity">Stock Quantity</label>
                                <input className="border py-2 px-3 text-grey-800" type="number" name="stockQuantity" onChange = {handleChange} id="stockQuantity"></input>
                            </div>
                        </div>
                        <div className = "flex flex-grow flex-col mx-4">
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-md text-gray-900" htmlFor="password">description</label>
                                <textarea className="border py-2 px-3 text-grey-800" placeholder="Enter Product Description" onChange = {handleChange} id="description" name="description" rows="4" cols="50">
                                </textarea>
                            </div>

                            <label className="mb-4 font-bold text-md text-gray-900" htmlFor="categories">Select among the catagories</label>
                            <div className="mb-3 font-bold text-md text-gray-900 py-2">
                                <select
                                    className="border py-2 px-3 text-grey-800 w-full"
                                    onChange={handleSelectValue}
                                >
                                    {console.log(categories)}
                                    {
                                        categories && categories.map((cat) =>
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            
                        </div>
                        <div className = "flex flex-grow flex-col mx-4">
                            <label className="mb-2 font-bold text-md text-gray-900" htmlFor="imagePath">Enter Image URL</label>
                            <input className="border py-2 px-3 text-grey-800" type="text" name="imagePath" onChange = {handleChange} id="imagePath"></input>
                            {/* <img height = "200" width = "200"src ={image} alt= "Gray Background" />
                            <input className ="mt-auto mt-4" type= "file" onChange = {handleImage}/> */}

                        </div>
                    </form>
                </div>
            </div>
            <button onClick = {submitToDataBase}className="block bg-teal-400 hover:bg-teal-600 uppercase text-md mx-auto 
                        p-4 rounded button mb-4" type="submit">Add New Product!</button>
        </div>
    )
}


export async function getServerSideProps() {
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    const products = await fetch("https://localhost:5001/api/Products", { agent }).then(
        (res) => res.json()
    );
    console.log(products)
    return { props: { products } };
}