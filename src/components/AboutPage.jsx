// AboutPage.jsx
import React from "react";
import Videopart from "./Videopart";
import {motion} from "framer-motion"

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
      <Videopart/>
      </motion.div>
    </div>
  
    
  );
};

export default AboutPage;
