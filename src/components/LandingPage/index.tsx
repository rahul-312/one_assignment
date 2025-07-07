import React from 'react'
import Link from 'next/link'

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to CarRental Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        A secure portal for managing and moderating user-submitted car rental listings. Please log in to continue.
      </p>

      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg cursor-pointer"
        >
        Admin Login
        </Link>

    </main>
  )
}

export default LandingPage
