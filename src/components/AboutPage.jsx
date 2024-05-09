// AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Image Section */}
        <div className="text-center mb-8">
          <img
            src="/banner-03.png"
            alt="About"
            className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Content Section */}
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

          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Lost Items vs Found Items
          </h3>
          <p className="text-gray-700 mb-8">
            In our platform, users can report lost items they have misplaced and
            also report items they have found. The key difference between lost
            and found items is that lost items are belongings that users have
            misplaced or lost and are searching for, while found items are
            belongings that users have discovered and are looking to return to
            their rightful owners.
          </p>

          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            We have a vision: to reunite the world!
          </h3>
          <p className="text-gray-700 mb-8 text-center">
            And so, we created SeekConnect to help you find that elusive
            reunion. While we cannot guarantee that you’ll find what you seek,
            we can say with confidence that our ever-growing, compassionate
            global community will do all we can to give your search a happy
            ending.
          </p>

          <p className="text-gray-700 mb-8 text-center">
            On SeekConnect, you can report and find:
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
