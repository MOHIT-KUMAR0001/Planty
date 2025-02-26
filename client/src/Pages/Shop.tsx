import axios from "axios";
import { useEffect, useState } from "react";

const Shop = () => {

  interface Product {
    _id: number
    name: string
    price: number
    description: string
    ImageUrl: string
  }

  const [products, setProducts] = useState<Product[]>([]);

  const Fecher = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts([...products, ...response.data]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    Fecher();
  },[])


  return (
    <section className="bg-[#181A1B] text-white min-h-screen py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">Shop Our Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-[#2A2D2F] rounded-lg shadow-lg p-5 transition-transform hover:scale-105">
              <img src={product.ImageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-gray-300 mt-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-400 font-bold">{product.price}</span>
                <button className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-500 transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
