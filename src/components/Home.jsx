import React from 'react'
import { Link } from 'react-router-dom'
import AboutPage from './AboutPage'
import Contact from './Contact'
import Features from './Features'
import {motion} from 'framer-motion';
import Team from './Team';
const Home = () => {
  return (
    <div>
      <section>
  <div class="mx-auto mt-16 max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        < motion.img 
        alt="" 
        src="/home.png" 
        initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1}}
        className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div class="lg:py-24">
        <motion.h2 
         initial={{opacity:0,x:-100}}
         animate={{opacity:1,x:0}}
         transition={{duration:1 , delay:0.5}} 
        class="text-4xl font- text-gray-600 sm:text-4xl">The Online Avenue to Reunion</motion.h2>
        <motion.p
         initial={{opacity:0,x:-100}}
         animate={{opacity:1,x:0}}
         transition={{duration:1 , delay:0.5}} className=" text-7xl"> Lost something? Find it here… </motion.p>
        <motion.p
         initial={{opacity:0,x:-100}}
         animate={{opacity:1,x:0}}
         transition={{duration:1 , delay:0.5}} 
         className="mt-4 text-gray-600">
        Welcome to the new online depository for missing items and people. SeekConnect's global platform makes it easy to find what – or whoever –you’ve lost.
        </motion.p>
       <Link to="/signup"><motion.a
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
        href="#" class="mt-8 inline-block rounded   bg-[#8a9de9] px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
          Sign up now , its free
        </motion.a>
        </Link> 
      </div>
    </div>
  </div>
</section>
<AboutPage/>
<Features/>
<Contact/>
    </div>
  )
}

export default Home
