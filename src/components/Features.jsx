import React from "react";
import {motion} from "framer-motion"
import { MdOutlineCheckCircle } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdScreenSearchDesktop } from "react-icons/md";
import { MdWindow } from "react-icons/md";
const Features = () => {
  return (
    < div>
      <section class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
              <div>
                <p class="mt-0.5 text-2xl flex gap-2 font-light text-center text-gray-900">
                <MdOutlineCheckCircle className="text-4xl text-[#8a9de9]" />Missing person image search
                </p>
              </div>
              <p class="mt-4 tex-black">
                Our leading AI analyzes your photographs of long-lost friends
                and family against extensive databases for the best chance of
                finding a match
              </p>
              </motion.div>
            </div>

            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}>
              <div>
                <p class="mt-0.5  flex gap-2 text-2xl font-light text-center text-gray-900">
                  {" "}
                  <MdOutlineCheckCircle className="text-4xl text-[#8a9de9]" /> Post missing items by category
                </p>
              </div>
              <p class="mt-4 tex-black">
               Categorize your lost or found items so that they can be reunited with their owners as seamlessly as possible
              </p>
              </motion.div>
            </div>

            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <motion.div initial={{ opacity: 0, y: 100 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1 }}>
              <div>
                <p class="mt-0.5 text-2xl flex gap-2 font-light text-center text-gray-900">
                  {" "}
                  <MdOutlineCheckCircle className="text-4xl text-[#8a9de9]" />Dynamic customized properties of items
                </p>
              </div>
              <p class="mt-4 tex-black">
                We have input endless properties for you to apply to lost or
                found items to support seamless reunion
              </p>
              </motion.div>
            </div>
            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
             <motion.div
             
             initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
              <div>
                <p class="mt-0.5 flex gap-2 text-2xl font-light text-center text-gray-900">
                  {" "}
                  <MdOutlineCheckCircle className="text-4xl text-[#8a9de9]" /> Dynamic customized properties of items
                </p>
              </div>
              <p class="mt-4 tex-black">
               We have input endless properties for you to apply to lost or found items to support seamless reunion
              </p>
              </motion.div>
            </div>
            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}>
              <div>
                <p class="mt-0.5 flex gap-2 text-2xl font-light text-center text-gray-900">
                  {" "}
                  <MdOutlineCheckCircle className="text-4xl text-[#8a9de9]" />Filter lost & found items by location
                </p>
              </div>
              <p class="mt-4 tex-black">
              The world’s a pretty big place… Use Seekconnexts’s location settings for a valuable geographic focus and increase the chance of a reunion
              </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div class="flex items-center gap-4">
              <MdScreenSearchDesktop class=" rounded-full text-[#8a9de9] text-center w-28 h-28 m-12 md:ml-24  sm:ml-24 " />
              </div>
              <div>
                <p class="mt-0.5 text-lg font-medium text-center m-4 text-gray-900">
                Fast search with powerful indexing

                </p>
              </div>
              <p class="mt-4 tex-black">
              Lostify is as enjoyable to use as it is beneficial. We continuously refine our Users experience to make your experience the best it can be
              </p>
            </div>
            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div class="flex items-center gap-4">
            <FaRegUserCircle class=" rounded-full text-[#8a9de9] text-center w-28 m-12 h-28 md:ml-24 sm:ml-24 " />
              </div>
              <div>
                <p class="mt-0.5 text-lg font-medium text-center m-4 text-gray-900">
                Beautiful user experience

                </p>
              </div>
              <p class="mt-4 tex-black">
              Lostify is as enjoyable to use as it is beneficial. We continuously refine our Users experience to make your experience the best it can be
              </p>
            </div>
            <div class="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
            <div class="flex items-center gap-4">
                <MdWindow class=" rounded-full text-[#8a9de9] text-center w-28 m-12 h-28 md:ml-24 sm:ml-24 " />
                 
              
              </div>
              <div>
                <p class="mt-0.5 text-lg font-medium text-center m-4 text-gray-900">
                Multi-tenant capability for enterprises

                </p>
              </div>
              <p class="mt-4 tex-black">
              We’re for organizations, too! Every entity can benefit from equipping their systems with Lostify via our Hub Enterprise offerings
              </p>
            </div>
            
          </div>
        </div>
    </section>
</div>
  );
};

export default Features;
