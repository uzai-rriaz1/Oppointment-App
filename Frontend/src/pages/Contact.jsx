import { Phone, Mail, Map } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-gray-50">
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
          alt="hospital"
          className="w-full h-[250px] md:h-[350px] object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm text-gray-500">Get In Touch</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h1>
          <p className="text-gray-500 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter your first name"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Enter your last name"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <select className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Select one...</option>
            <option>General Inquiry</option>
            <option>Appointment</option>
            <option>Support</option>
          </select>

          <textarea
            placeholder="Type your message..."
            className="w-full p-3 rounded-xl border border-gray-300 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          ></textarea>

          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="text-sm text-gray-600">I accept the terms</label>
          </div>

          <div className="flex justify-center">
            <button className="bg-teal-600 text-white px-10 py-3 rounded-xl hover:bg-teal-700 transition">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-6 text-center">
        <div>
          <Mail className="mx-auto text-teal-600 mb-2" size={30} />
          <p className="text-gray-700">contact@medify.com</p>
        </div>
        <div>
          <Phone className="mx-auto text-teal-600 mb-2" size={30} />
          <p className="text-gray-700">+92-311-999999</p>
        </div>
        <div>
          <Map className="mx-auto text-teal-600 mb-2" size={30} />
          <p className="text-gray-700">Gulberg V, Lahore</p>
        </div>
      </div>

      <div className="text-center py-10">
        <h2 className="text-lg font-semibold mb-4">
          Subscribe to our newsletter
        </h2>
        <div className="flex justify-center gap-2 px-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-full border w-64 focus:outline-none"
          />
          <button className="bg-teal-600 text-white px-6 rounded-full">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
