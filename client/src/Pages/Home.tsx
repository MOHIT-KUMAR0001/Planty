import main from "../assets/main.png"
import plant from "../assets/plant.png"
import flower from "../assets/home_flower.png"
import flower2 from "../assets/home_flower2.png"
import rose from "../assets/rose.png"
import { Link } from "react-router-dom";
const Home = () => {
    return (
        <>
            <section className="p-5 lg:flex items-center justify-around">
                <div className="left flex gap-2 flex-col lg:gap-5">
                    <h1 className="text-3xl font-bold">Bring the Outdoors In
                        with our <span className="italic text-green-700">Beautiful Flowers </span>
                        and Plant</h1>
                    <p> We offer a wide range of beautiful flowers and plants that can bring life to your home or office.</p>
                    <div className="buttons flex gap-3">
                        <Link to="/shop">
                        <button className="p-3 gradient text-white rounded-md"><i className="ri-shopping-bag-fill"></i> Shop Now</button>
                        </Link>
                        <Link to="/contact">
                        <button className="p-3 border-2 border-green-700 text-green-700 rounded-md font-bold"><i className="ri-contacts-fill"></i> Contact Us</button>
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <div className="main-image-container">
                        <img src={main} alt="Main Image" className="w-full h-full object-cover rounded-lg " />
                    </div>
                </div>
            </section>
            <div className="bg-green-700 h-0.5 mx-3 lg:mx-10"></div>

            <section className="flex flex-col gap-5 items-center mt-10">
                <div className="box w-[80%] h-[15vh] gradient flex justify-between p-5 rounded-md">
                    <div className="text">
                        <h3 className="text-2xl text-white">Rose Varieties</h3>
                        <a href="/shop" className="underline">Shop now</a>
                    </div>
                    <div className="img-container">
                        <img src={rose} alt="img" className="h-full w-full" />
                    </div>
                </div>
                <div className="box w-[80%] h-[15vh] gradient flex justify-between p-5 rounded-md">
                    <div className="text">
                        <h3 className="text-2xl text-white">Rose Varieties</h3>
                        <a href="/shop" className="underline">Shop now</a>
                    </div>
                    <div className="img-container">
                        <img src={plant} alt="img" className="h-full w-full" />
                    </div>
                </div>
                <div className="box w-[80%] h-[15vh] gradient flex justify-between p-5 rounded-md">
                    <div className="text">
                        <h3 className="text-2xl text-white">Rose Varieties</h3>
                        <a href="/shop" className="underline">Shop now</a>
                    </div>
                    <div className="img-container">
                        <img src={flower} alt="img" className="h-full w-full" />
                    </div>
                </div>
                <div className="box w-[80%] h-[15vh] gradient flex justify-between p-5 rounded-md">
                    <div className="text">
                        <h3 className="text-2xl text-white">Rose Varieties</h3>
                        <a href="/shop" className="underline">Shop now</a>
                    </div>
                    <div className="img-container">
                        <img src={flower2} alt="img" className="h-full w-full" />
                    </div>
                </div>
            </section>

            <section className="flex justify-center items-center mt-20 px-6 py-10 flex-col gap-6 text-white rounded-2xl shadow-lg w-11/12 max-w-4xl mx-auto">

                <div className="title text-center">
                    <h1 className="text-4xl font-semibold italic leading-tight">
                        Embrace Nature’s Beauty with Lush
                        <span className="text-green-300 font-bold"> Plants </span> &
                        <span className="text-green-300 font-bold"> Vibrant Flowers</span>
                    </h1>
                </div>

                <div className="par text-white p-6 rounded-xl shadow-md text-lg leading-relaxed relative">
                    <span className="absolute top-0 left-2 text-green-700">
                        <i className="ri-double-quotes-l text-4xl"></i>
                    </span>

                    <p className="text-justify">
                        Discover the enchanting world of plants and flowers that breathe life into your space. Whether you seek the calming presence of lush greenery or the vibrant charm of blooming petals, nature’s wonders can transform any environment into a serene retreat. From air-purifying indoor plants to breathtaking garden florals, let every leaf and petal tell a story of growth, beauty, and tranquility. Start your journey towards a greener, more refreshing world today!
                    </p>

                    <span className="absolute bottom-0 right-2 text-green-700">
                        <i className="ri-double-quotes-r text-4xl"></i>
                    </span>
                </div>
            </section>

        </>
    )
}

export default Home;

