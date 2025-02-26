import garden from "../assets/garden.png";

const About = () => {
  return (
    <section className="py-28 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <span className="text-golden font-semibold tracking-widest">ABOUT OUR NURSERY</span>
          <h2 className="text-5xl font-playfair font-bold mt-4 text-white">
            Growing Nature’s Beauty Since 2012
          </h2>
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-golden rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div className="relative group">
            <div className="absolute inset-0 border-4 border-golden/30 transform rotate-3 rounded-xl shadow-2xl" />
            <img
              src={garden}
              alt="Indian Garden"
              className="relative z-10 rounded-lg transform group-hover:scale-105 transition-all duration-700 ease-out"
            />
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center">
                <i className="ri-plant-line text-2xl text-white"></i>
              </div>
              <h3 className="text-3xl font-playfair font-semibold text-white">
                Bringing Nature Closer to You
              </h3>
            </div>
            <p className="text-lg leading-relaxed text-lightGray">
              At <span className="text-golden">Planty Gardens</span>, we bring the love for plants to your home. Inspired 
              by India’s rich gardening traditions, we use natural and eco-friendly methods to grow the best plants 
              and flowers. Whether it’s a Tulsi plant for your home or a beautiful garden full of flowers, we take 
              care of every leaf with passion.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="bg-darkGreen/50 p-6 rounded-xl border border-golden/20">
                <h4 className="text-golden text-xl font-semibold mb-3">Pure & Organic</h4>
                <p className="text-lightGray text-sm">Grown with natural, chemical-free methods</p>
              </div>
              <div className="bg-darkGreen/50 p-6 rounded-xl border border-golden/20">
                <h4 className="text-golden text-xl font-semibold mb-3">Award-Winning Quality</h4>
                <p className="text-lightGray text-sm">Recognized for best plant care & sustainability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Our Promise", content: "Healthy, fresh plants for your home & garden", icon: "ri-leaf-line" },
            { title: "Expert Care", content: "Traditional knowledge meets modern methods", icon: "ri-seedling-line" },
            { title: "Eco-Friendly", content: "Sustainable, water-saving techniques", icon: "ri-earth-line" }
          ].map((item, index) => (
            <div key={index} className="p-8 bg-darkGreen/40 rounded-2xl backdrop-blur-sm transition-all hover:bg-golden/10">
              <i className={`${item.icon} text-4xl text-golden mb-4`}></i>
              <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
              <p className="text-lightGray">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-center mt-16">
          <div className="p-8 bg-darkGreen/40 rounded-2xl backdrop-blur-sm transition-all hover:bg-golden/10">
            <i className="ri-star-smile-line text-4xl text-golden mb-4"></i>
            <h4 className="text-xl font-playfair font-semibold text-white mb-3">Why Choose Us</h4>
            <p className="text-lightGray">
              We respect India’s love for nature. Our plants are grown with care, following traditional and eco-friendly
              methods. Whether you want to decorate your home, start a garden, or purify your air, we provide 
              the best green companions for you.
            </p>
          </div>
          <div className="p-8 bg-darkGreen/40 rounded-2xl backdrop-blur-sm transition-all hover:bg-golden/10">
            <i className="ri-award-line text-4xl text-golden mb-4"></i>
            <h4 className="text-xl font-playfair font-semibold text-white mb-3">Best Quality Guaranteed</h4>
            <p className="text-lightGray">
              From exotic flowers to traditional Indian plants, every plant we grow is nurtured with love. We use 
              organic fertilizers and natural growth techniques to ensure strong, healthy plants that last long 
              and bring beauty to your space.
            </p>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-72 h-72 bg-golden/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-darkGreen/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  );
};

export default About;
