import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-green-700 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">

                <div className="text-2xl font-bold"><i className="ri-leaf-fill"></i>Planty</div>

                <ul className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-green-300 text-xl" >Home</Link>
                    <Link to="/about" className="hover:text-green-300 text-xl" >About</Link>
                    <Link to="/shop" className="hover:text-green-300 text-xl" >Shop</Link>
                    <Link to="/contact" className="hover:text-green-300 text-xl" >Contact</Link>
                </ul>

                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <ul className="md:hidden text-white flex flex-col items-center p-4 space-y-4 h-screen">
                    <Link to="/" className="hover:text-green-300 text-xl" ><i className="ri-home-4-fill"></i> Home</Link>
                    <Link to="about" className="hover:text-green-300 text-xl" ><i className="ri-hearts-fill"></i> About</Link>
                    <Link to="/shop" className="hover:text-green-300 text-xl" ><i className="ri-shopping-bag-fill"></i> Shop</Link>
                    <Link to="/contact" className="hover:text-green-300 text-xl" ><i className="ri-contacts-fill"></i> Contact</Link>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
