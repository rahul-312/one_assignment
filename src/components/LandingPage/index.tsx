import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingPage: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/car.svg"
        alt="Car background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 mt-10 flex flex-col items-center px-4 text-center text-white">
        <h1 className="text-4xl mt-20 font-bold mb-4">
          Welcome to CarRental Admin Dashboard
        </h1>
        <p className="mb-8 max-w-xl">
          A secure portal for managing and moderating user-submitted car rental listings
        </p>
      </div>
    </main>
  );
};

export default LandingPage;
