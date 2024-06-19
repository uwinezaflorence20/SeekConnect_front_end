
import { GoArrowRight } from "react-icons/go";



const Otherpart = () => {
 
  

  return (
    <div>
      <div className=" relative p-3 mt-12 flex flex-col">
        <div className="mt-10 w-60 p-8 bg-[#8a9de9]">
          <p className="bg-[#8a9de9] text-white font-light text-lg px-4 py-2">Run Image Search</p>
          <p className="bg-[#8a9de9] text-white ml-4 font-extralight text-sm">Find missing person with simple image</p>
          <GoArrowRight className='text-white mt-8 ml-36' />
        </div>
      </div>
    </div>
  );
};

export default Otherpart;
