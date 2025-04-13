import React from 'react'

const About = () => {
return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">About Us</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
                Welcome to <span className="font-semibold">Get Me A Stork</span>, your trusted partner in delivering joy and happiness. 
                Our mission is to make your special moments unforgettable by providing exceptional services tailored to your needs.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
                Whether you're celebrating a milestone, planning a surprise, or just looking to brighten someone's day, 
                we're here to help. Thank you for choosing us to be part of your journey!
            </p>
        </div>
    </div>
)
}

export default About

export const metadata = {
    title: 'About - GetMeAStork',
    description: 'Learn more about GetMeAStork and our mission to deliver joy and happiness.',
    keywords: 'GetMeAStork, about us, mission, services, happiness',
  }

