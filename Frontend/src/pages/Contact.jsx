import { Phone, Mail, Map } from "lucide-react";

const Contact = () => {
  return (
    <div className="grid md:grid-cols-2 place-items-center gap-10 min-h-screen bg-sky-50 px-4">
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center items-center text-center bg-blue-600 rounded-3xl shadow-xl px-10 py-12 md:px-16 lg:px-24">
        <h1 className="font-bold text-white text-2xl mb-6">
          Lets Get In Touch
        </h1>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <Mail size={40} className="text-white mb-2" />
            <h4 className="text-white font-semibold">Email</h4>
            <p className="text-blue-100">contact@medify.com</p>
          </div>

          <div className="flex flex-col items-center">
            <Phone size={40} className="text-white mb-2" />
            <h4 className="text-white font-semibold">Phone</h4>
            <p className="text-blue-100">+92-311-999999</p>
          </div>

          <div className="flex flex-col items-center">
            <Map size={40} className="text-white mb-2" />
            <h4 className="text-white font-semibold">Location</h4>
            <p className="text-blue-100">gulberg v, Lahore</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex justify-center items-center w-full">
        <form className="bg-white py-10 px-8 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 text-lg mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name"
                className="p-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 text-lg mb-1">
                Email:
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter Your Email"
                className="p-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-700 text-lg mb-1">
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter Your Message"
                className="p-3 bg-gray-100 rounded-xl h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg cursor-pointer">
              Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
