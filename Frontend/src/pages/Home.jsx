const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 max-sm:mt-10 xl:mt-20 mt-28">
      <div className="grid place-items-center space-y-5">
        <h1 className="font-bold text-4xl max-sm:text-2xl text-gray-800">
          Your Health, Our Priority
        </h1>
        <p className="text-2xl text-center max-sm:text-xl md:pl-2 pr-2 text-gray-500">
          Book appointments with top doctors anytime, anywhere quick, easy, and
          reliable.
        </p>
        <button className="font-medium text-white bg-blue-600 p-5 rounded-full  max-sm:p-3 hover:bg-blue-700 cursor-pointer hover:shadow-lg shadow-blue-500">
          Book Appointment
        </button>
      </div>
      <div className="space-y-8 px-4">
        <h1 className="font-bold text-2xl py-5 text-center text-gray-800">
          Why Choose Us?
        </h1>
        <div className="grid grid-cols-4 text-white gap-6 p-4 max-sm:grid-cols-2 max-sm:gap-4 max-sm:p-3  max-md:grid-cols-3 place-items-center bg-blue-600 min-h-72 rounded-lg max-sm:min-h-80">
          <div className="text-center hover:scale-110 transition-transform ease-out duration-500 hover:bg-white hover:rounded-lg hover:pt-10 hover:pb-10 hover:text-blue-600 max-sm:hover:pt-5 max-sm:hover:pb-5">
            <h2 className="font-medium text-2xl max-sm:text-xl">
              Expert Doctors
            </h2>
            <h4 className="text-center max-sm:text-sm">
              Connect with certified and experienced specialists across various
              medical fields.
            </h4>
          </div>
          <div className="text-center hover:scale-110 transition-transform ease-out duration-500 hover:bg-white hover:rounded-lg hover:pt-10 hover:pb-10 hover:text-blue-600 max-sm:hover:pt-5 max-sm:hover:pb-5">
            <h2 className="font-medium text-2xl max-sm:text-xl">
              24/7 Availability
            </h2>
            <h4 className="text-center max-sm:text-sm">
              Book appointments anytime, day or night, according to your
              schedule.
            </h4>
          </div>
          <div className="text-center hover:scale-110 transition-transform ease-out duration-500 hover:bg-white hover:rounded-lg hover:pt-10 hover:pb-10 hover:text-blue-600 max-sm:hover:pt-5 max-sm:hover:pb-5">
            <h2 className="font-medium text-2xl max-sm:text-xl">
              Personalized Care
            </h2>
            <h4 className="text-center max-sm:text-sm">
              Get matched with doctors who understand your unique health needs.
            </h4>
          </div>
          <div className="text-center hover:scale-110 transition-transform ease-out duration-500 hover:bg-white hover:rounded-lg hover:pt-10 hover:pb-10 hover:text-blue-600 max-sm:hover:pt-5 max-sm:hover:pb-5">
            <h2 className="font-medium text-2xl max-sm:text-xl">Time Saving</h2>
            <h4 className="text-center max-sm:text-sm">
              The process eliminates long waits on hold, travel time, and
              sitting in crowded waiting rooms.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
