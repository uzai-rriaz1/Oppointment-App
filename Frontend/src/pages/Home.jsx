import { lazy } from "react";
import { services } from "../assets/services/services";
import { images } from "../assets/services/services";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-700">
      <section className="grid md:grid-cols-2 items-center px-8 py-16 gap-10">
        <div>
          <h2 className="text-4xl font-bold leading-snug">
            Providing Quality <span className="text-teal-600">Healthcare</span>
            <br />
            For A Brighter Future
          </h2>

          <p className="mt-4 text-gray-500">
            We are dedicated to providing exceptional healthcare services for
            all patients.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg">
              Appointments
            </button>
            <button className="border px-6 py-3 rounded-lg">Watch Video</button>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            loading="lazy"
            src={images.doctorsimg}
            alt="doctor"
            className="rounded-4xl shadow-lg pt-4"
          />
        </div>
      </section>

      <section className="bg-white mx-8 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Name"
          className="border p-3 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Specialty"
          className="border p-3 rounded-lg w-full"
        />

        <div className="flex items-center gap-2">
          <span>Available</span>
          <input type="checkbox" />
        </div>

        <button className="bg-teal-600 text-white px-6 py-3 rounded-lg">
          Search
        </button>
      </section>

      <section className="text-center py-16">
        <h3 className="text-xl font-semibold text-teal-600 mb-10">
          Our results in numbers
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-2xl font-bold text-teal-600">99%</h4>
            <p>Customer satisfaction</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-teal-600">15k</h4>
            <p>Online Patients</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-teal-600">12k</h4>
            <p>Patients Recovered</p>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-teal-600">240%</h4>
            <p>Company growth</p>
          </div>
        </div>
      </section>

      <section className="px-8 py-16">
        <h3 className="text-center text-2xl font-bold mb-10">
          Services we provide
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <img
                loading="lazy"
                src={item.img}
                alt=""
                className="rounded-lg mb-3"
              />
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-500 mt-2">
                High quality healthcare service.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-16 bg-gray-100">
        <h3 className="text-center text-2xl font-bold mb-10">
          Meet our team members
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {["John Carter", "Sophie Moore", "Matt Cannon"].map((name, i) => (
            <div key={i} className="bg-white p-6 rounded-xl text-center shadow">
              <img
                src="https://via.placeholder.com/100"
                alt=""
                className="mx-auto rounded-full mb-4"
              />
              <h4 className="font-semibold">{name}</h4>
              <p className="text-sm text-gray-500">Specialist</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-16">
        <h3 className="text-center text-2xl font-bold mb-10">Testimonials</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "An amazing service",
            "One of a kind service",
            "The best service",
          ].map((text, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <p>"{text}"</p>
              <h5 className="mt-4 font-semibold">Client</h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
