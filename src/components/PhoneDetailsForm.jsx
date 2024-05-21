import React, { useState } from 'react';

const PhoneDetailsForm = () => {
  const [imei, setImei] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [dateLastSeen, setDateLastSeen] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      imei,
      brand,
      color,
      dateLastSeen,
      country,
      state,
      city,
    };
    console.log('Form Data:', formData);
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Please supply the IMEI number of this phone.</label>
        <input
          type="text"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="15/17 digit IMEI number code e.g. AA-BBBBBB-CCCCCC-D"
        />
      </div>
      <div>
        <label className="block text-gray-700">What is the brand of this phone?</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Brand e.g. Samsung Galaxy S10"
        />
      </div>
      <div>
        <label className="block text-gray-700">Please specify a distinctive color that best identifies this phone.</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Color e.g. gold"
        />
      </div>
      <div>
        <label className="block text-gray-700">Date last seen</label>
        <input
          type="date"
          value={dateLastSeen}
          onChange={(e) => setDateLastSeen(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700">Country last seen/found</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700">State or province last seen/found</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700">City/LGA/County last seen/found</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default PhoneDetailsForm;

