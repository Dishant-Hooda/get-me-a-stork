"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[44vh] gap-4">
        <div className="font-bold md:text-5xl text-3xl flex justify-center items-center">Buy me a <span><img src="/stork.gif" width={90} alt="stork" /></span></div>
        <p>
          A crowd funding webnsite that can <br /> help cretors to fund their projects
        </p>
        <div>
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start here</button>
          </Link>
          <Link href={"/about"}>
            <button className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-red-50 h-1 opacity-20"></div>

      <div className="container mx-auto py-16">
        <h2 className="text-center text-2xl font-bold my-10">Your Fans Support You Here!</h2>
        <div className="md:flex-row flex flex-col gap-5 justify-around">
          <div className="item flex flex-col justify-center items-center min-w-40">
            <a href="#" className="flex flex-col items-center justify-center min-w-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 space-y-2">
              <img className="rounded-full bg-slate-500 p-2" src="/man.gif" width={100} alt="man" />
              <p className="font-normal text-gray-700 dark:text-gray-400">Fund Yoursel</p>
              <p className="w-40 text-center">You can run campaing to fund youself</p>
            </a>
          </div>

          <div className="item flex flex-col justify-center items-center min-w-40">
            <a href="#" className="flex flex-col items-center justify-center min-w-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 space-y-2">
              <img className="rounded-full bg-slate-500 p-2" src="/coin.gif" width={100} alt="man" />
              <p className="font-normal text-gray-700 dark:text-gray-400">Recieve Donation</p>
              <p className="w-40 text-center">Your donations will come directly to your account</p>
            </a>
          </div>

          <div className="item flex flex-col justify-center items-center min-w-40">
            <a href="#" className="flex flex-col items-center justify-center min-w-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 space-y-2">
              <img className="rounded-full bg-slate-500 p-2" src="/group.gif" width={100} alt="man" />
              <p className="font-normal text-gray-700 dark:text-gray-400">Fans Can Help</p>
              <p className="w-40 text-center">Your fans can support you here!</p>
            </a>
          </div>

        </div>
      </div>

      <div className="bg-red-50 h-1 opacity-20"></div>

      <div className="container mx-auto py-16">
        <h2 className="text-center text-2xl font-bold my-10">Learn More About Us</h2>
        <div className="md:flex-row flex flex-col gap-5 justify-around">

          <div className="item flex flex-col justify-center items-center md:min-w-40">
            <a href="#" className="flex flex-col items-center justify-center min-w-40 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 space-y-2">
              <img className="rounded-full bg-slate-500 p-2" src="/man.gif" width={100} alt="man" />
              <p className="font-normal text-gray-700 dark:text-gray-400">Stork</p>
              <p className="w-40 text-center">Stork is the best platform to get your funds without commission</p>
            </a>
          </div>

          <iframe height="315" src="https://www.youtube.com/embed/Zka7duZ0xdU?si=gkZesVqwII3dy7im" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        </div>
      </div>

    </>
  );
}
