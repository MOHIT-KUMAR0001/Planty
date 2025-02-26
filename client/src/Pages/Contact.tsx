import axios from "axios";
import { useEffect, useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/api/contact", form);
    if (response){
       console.log("Form submitted successfully!");
       setForm({ name: "", email: "", phone: "", message: "" });
       setSubmitted(true);
    }else{
      console.log("Failed to submit form.")
    }
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 2000); 
    }
  }, [submitted]);

  return (
    <section className="py-24 px-6 bg-[#181A1B] text-white relative overflow-hidden">
      {
        submitted && (
          <div className="nortification absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-black opacity-50">
            <h3 className="text-xl font-bold text-green-700 mb-4">Submitted!</h3>
          </div>
        )
      }
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-green-700 font-playfair">Get in Touch</h2>
          <p className="mt-4 text-gray-300 text-lg">We’d love to hear from you! Reach out for any inquiries or assistance.</p>
          <div className="w-24 h-1 bg-green-700 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <i className="ri-map-pin-line text-4xl text-green-700"></i>
              <div>
                <h4 className="text-xl font-semibold">Our Address</h4>
                <p className="text-gray-300">Ajit Road, Bathinda, India</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <i className="ri-mail-send-line text-4xl text-green-700"></i>
              <div>
                <h4 className="text-xl font-semibold">Email Us</h4>
                <p className="text-gray-300">info@planty.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <i className="ri-phone-line text-4xl text-green-700"></i>
              <div>
                <h4 className="text-xl font-semibold">Call Us</h4>
                <p className="text-gray-300">+91 123 456 7890</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#1E1E1E] p-8 rounded-xl shadow-lg w-full">
            <div className="mb-6">
              <label className="block text-sm font-medium text-green-700 mb-2">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-green-700 mb-2">Your Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required  rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-500 outline-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-green-700 text-gray-900 py-3 font-semibold rounded-lg transition-all hover:bg-green-600">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
