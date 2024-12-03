import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

function Footer() {
  return (
    <div>

<footer className="bg-white dark:bg-red-950 text-start pl-2">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-10 md:mb-0 flex items-center gap-5">
              <a href="https://www.fatima.edu.ph/" className="flex items-center">
                  <div className='h-20'>
                    <img src={require("../imgs/Corazon/logo.png")} className=" object-contain me-3" alt="FlowBite Logo" />
                  </div>
              </a>
              <span className="self-center w-2/4 text-xs leading-6 dark:text-white md:text-sm md:font-light md:leading-7">Escuela de Corazon of Quezon City lives through accessible, student-centered, high-quality education and meets learners’ needs for a lifetime.
              </span>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Escuela De Corazon Of Quezon City™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://www.facebook.com/fcmsocietyqc" className="text-gray-50 hover:text-gray-900 dark:hover:text-white">
                  <FaFacebookF />
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-50 hover:text-gray-900 dark:hover:text-white ms-5">
                  <FaXTwitter />
                  <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-50 hover:text-gray-900 dark:hover:text-white ms-5">
                <IoLogoInstagram />
                  <span className="sr-only">Instagram Account</span>
              </a>
          </div>
      </div>
    </div>
</footer>
    </div>
  )
}

export default Footer