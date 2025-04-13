"use client"

import { React, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <nav className="bg-slate-900 text-white flex justify-between items-center px-4 md:h-20">
        <div className="logo text-bold text-xl">
          <Link href={'/'}>
            <img className="rounded-full invert" src="/stork_logo.png" alt="stork" width={80} />
          </Link>
        </div>

        <div className="relative">
          {session && (
            <>
              <button ref={buttonRef}
                id="dropdownDefaultButton"
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowDropdown(!showDropdown)
                  }, 100)
                }}
              data-dropdown-toggle="dropdown"
              className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              >
              Welcome {session?.user?.name || session?.user?.username || session?.user?.email}
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

          {/* Dropdown Menu */}
          <div ref={dropdownRef} className={`z-10 ${showDropdown ? "" : "hidden"} absolute left-[50px] top-[50px] bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session?.user?.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>

              <li>
                <Link href="#" onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>
        </>
          )}

        {!session && (
          <Link href={"/login"}>
            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Sign In
            </button>
          </Link>
        )}
    </div>
      </nav >
    </div >
  );
}

export default Navbar
