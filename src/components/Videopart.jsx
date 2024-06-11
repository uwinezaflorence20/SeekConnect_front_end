import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion';
const Videopart = () => {
  return (
    <div>
      <section>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

      <div class="lg:py-24">
        <h2 class="text-3xl font-bold sm:text-4xl">What's SeekConnect</h2>

        < motion.p
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
         class="mt-4 text-gray-600">
        From valuables like wallets and  to long-lost family members and dear old friends – life can sure feel 
        empty until you’re reunited with what you miss. With SeekConnect, your overdue reunion may be just around the corner. 
      </motion.p>
        <motion.h2
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
         class="text-3xl font-bold sm:text-2xl">Lost Something?</motion.h2>
        <motion.p
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
        class="mt-4 text-gray-600">
        Post details of your missing items, valuables or persons and search through the results.
        </motion.p>
        <motion.h2
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
         class="text-3xl font-bold sm:text-2xl">Found Something?</motion.h2>
        <motion.p 
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
        class="mt-4 text-gray-600">
        Share descriptions and images of what you’ve found and reunite them with their grateful owner or help reconnect people who miss one another.
        </motion.p>
       
        <Link to="/signup"><motion.a
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
        href="#" class="mt-8 inline-block rounded animate-bounce  bg-[#8a9de9] px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
          Sign up now , its free
        </motion.a>
        </Link>



      </div>

<div class="relative h-80 bg- overflow-hidden rounded-lg mt-24 sm:h-80 lg:order-last lg:h-full">
        < motion.video
        initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
        src="/ad_.mp4" alt="video" type="video/mp4" className="w-full" controls/>

      </div>

    </div>
  </div>
</section>
    </div>
  )
}

export default Videopart
