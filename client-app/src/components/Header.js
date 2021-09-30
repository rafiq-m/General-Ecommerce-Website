import Image from "next/image";
import {
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import logo from "../../images/techneck3-removebg-preview.png";
import { selectItemsCount } from "../slices/basketSlice";


function Header(props) {
    const [session] = useSession();
    const router = useRouter();
    const itemsCount = useSelector(selectItemsCount)
    const items = useSelector(selectItems);

    return (
        //active:transform active:scale-90
        <header className="sticky top-0 z-50">
            {/* Top nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="my-2 flex items-center flex-grow sm:flex-grow-0 mx-6">
                    <Image
                        onClick={() => router.push("/")}
                        src={logo}
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>

                {/* Custom search bar */}
                <div className="hidden sm:flex items-center h-10 rounded-md bg-blue-400 hover:bg-blue-500 flex-grow cursor-pointer">
                    <input
                        type="text"
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
                        placeholder={
                            router.route === "/"
                                ? "Search in products listed below…"
                                : ""
                        }
                        onInput={(event) =>
                            router.route === "/" &&
                            props.onSearchValue(event.target.value)
                        }
                    />
                    <SearchIcon className="h-12 p-4" />
                </div>

                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-10 mx-10 whitespace-nowrap">
                    <div
                        onClick={!session ? signIn : signOut}
                        className="link cursor-pointer">
                        <p className="hover:underline">
                            {session
                                ? `Hello, ${session.user.name}`
                                : "Sign In"}
                        </p>
                        <p className="font-bold md:text-sm">
                            {session ? session.user.email : "To buy products"}
                        </p>
                    </div>

                    {session && session.user.email == "rafiq.m1998@gmail.com" ?
                        <div className="flex space-x-6">
                            <div
                                className="link"
                                onClick={() => router.push("/addProduct")}>
                                <p className="font-bold md:text-sm">Add</p>
                                <p className="font-bold md:text-sm">New Product</p>
                            </div>
                            <div
                                className="link"
                                onClick={() => router.push("/orders")}>
                                <p className="font-bold md:text-sm">Orders</p>
                                <p className="font-bold md:text-sm">& History</p>
                            </div>
                        </div> :
                        <div
                            className="link"
                            onClick={() => router.push("/orders")}>
                            <p className="font-bold md:text-sm">Returns</p>
                            <p className="font-bold md:text-sm">& Orders</p>
                        </div>

                    }







                    <div
                        className="relative link flex items-center"
                        onClick={() => router.push("/checkout")}>
                        <span
                            className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-blue-400 text-center rounded-full text-black font-bold">{itemsCount}</span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                            Basket
                        </p>
                    </div>
                </div>
            </div>



            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                {/* <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p> */}
                <p className="link" onClick={() => {
                    router.route === "/" &&
                        props.onSearchValue("")
                }}>Show All Products</p>
                <p className="link" onClick={() => {
                    router.route === "/" &&
                        props.onSearchValue("HP Spectre x360")
                }}>HP Spectre x360</p>
                <p className="link" onClick={() => {
                    router.route === "/" &&
                        props.onSearchValue("HP OMEN")
                }}>HP OMEN</p>
                <p className="link" onClick={() => {
                    router.route === "/" &&
                        props.onSearchValue("HP Probook")
                }}>HP Probook</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Workstations</p>
                <p className="link hidden lg:inline-flex">Exclusives</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">APIs</p>
                <p className="link hidden lg:inline-flex">
                    HP Elite Book
                </p>
            </div>
        </header>
    );
}

export default Header;
