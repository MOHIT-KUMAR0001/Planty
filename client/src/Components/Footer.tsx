const Footer = () => {
    return (
        <footer className="bg-[#3C3F41] text-white py-10 mt-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                <div>
                    <h2 className="text-3xl font-bold">Planty</h2>
                    <p className="mt-2 text-green-200">
                        Bringing nature closer to your home with lush plants and vibrant flowers.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-green-300 transition">Home</a></li>
                        <li><a href="#" className="hover:text-green-300 transition">About</a></li>
                        <li><a href="#" className="hover:text-green-300 transition">Shop</a></li>
                        <li><a href="#" className="hover:text-green-300 transition">Contact</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                    <p className="flex items-center justify-center md:justify-start gap-2">
                        <i className="ri-mail-fill text-xl"></i> info@Planty.com
                    </p>
                    <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
                        <i className="ri-phone-fill text-xl"></i> +123 456 7890
                    </p>


                    <div className="flex justify-center md:justify-start mt-4 gap-4">
                        <a href="#" className="hover:text-green-300 transition"><i className="ri-facebook-fill text-2xl"></i></a>
                        <a href="#" className="hover:text-green-300 transition"><i className="ri-instagram-fill text-2xl"></i></a>
                        <a href="#" className="hover:text-green-300 transition"><i className="ri-twitter-fill text-2xl"></i></a>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-green-200 text-sm">
                &copy; {new Date().getFullYear()} Planty. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
