import React from "react";
import Image from "next/image";

const LandingPage: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full">
      <Image
        src="/assets/images/car.png"
        alt="Car background"
        fill
        priority
        className="z-0"
      />
      <div className="absolute inset-0 z-10 mt-10 flex flex-col items-center text-center text-white">
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
