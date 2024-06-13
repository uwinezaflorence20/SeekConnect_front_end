// AboutPage.jsx
import React from "react";
import Videopart from "./Videopart";
import {motion} from "framer-motion"
import Missingperson from './Missingperson'
import Gridperson from './Gridperson';
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-white mt-20 min-h-screen w-full">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <img
            src="/about.png"
            alt="About"
            className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Hate that sinking feeling when you realize you’ve lost something? Us
            too!
          </h3>
          <p className="text-gray-700 mb-8">
            We spend hours, days – even years – searching high and low through
            the pockets of our clothing and drawers of our homes, tracing back
            our footsteps and asking around the area – yet often we never again
            find what we’ve lost.
          </p>
        </div>
      </div>
      <Gridperson/>
      <div className="text-center text-2xl font-semibold">
        <p> Lost something or Found Something. sign up to post</p>
        <Link to="/signup"><motion.a
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1 , delay:0.5}} 
        href="#" class="mt-8 inline-block rounded   bg-[#8a9de9] px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
          Sign up now , its free
        </motion.a>
        </Link> 
      </div>
      <Videopart/>
      </motion.div>
    </div>
  
    
  );
};

export default AboutPage;
