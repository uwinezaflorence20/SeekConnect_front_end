import React from 'react'
import { Link } from 'react-router-dom'
import AboutPage from './AboutPage'
const Home = () => {
  return (
    <div>
      <section>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <img alt="" src="/banner-01.png" class="absolute inset-0 h-full w-full object-cover"/>
      </div>

      <div class="lg:py-24">
        <h2 class="text-4xl font- text-gray-600 sm:text-4xl">The Online Avenue to Reunion</h2>
        <p className=" text-7xl"> Lost something? Find it here… </p>
        <p class="mt-4 text-gray-600">
        Welcome to the new online depository for missing items and people. SeekConnect's global platform makes it easy to find what – or whoever –you’ve lost.
        </p>
       <Link to="/signup"><a href="#" class="mt-8 inline-block rounded animate-bounce  bg-[#8a9de9] px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
          Sign up now , its free
        </a>
        </Link> 
      </div>
    </div>
  </div>
</section>
<AboutPage/>
    </div>
  )
}

export default Home
