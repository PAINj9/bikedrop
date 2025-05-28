// BikeDropHero.jsx
import { Link } from "react-router-dom";

export default function BikeDropHero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 gap-10">
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          We Take Care of Your Bike, Wherever You Are
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          BikeDrop is a mobile bike maintenance service based in Aarhus. We come to you — offering flexible subscription plans tailored to your riding style. From quick tune-ups and regular cleaning to full technical repairs, your bike stays in top shape, so you can just enjoy the ride.
        </p>
        <Link to="/book">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Book Now
          </button>
        </Link>
      </div>
      <img
        src="/bike-hero.jpg"
        alt="Woman riding a bike"
        className="w-full max-w-md rounded-2xl shadow-lg"
      />
    </section>
  );
}
