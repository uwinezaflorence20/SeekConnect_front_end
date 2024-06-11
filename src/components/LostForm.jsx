import React, { useState } from "react";

function Post({ onSubmit }) {
  const [formData, setFormData] = useState({
    Email: "",
    DocumentType: "",
    NameOnDocument: "",
    PlaceOfIssueOnDocument: "",
    LostDate: "",
    LostPlace: {
      Country: "",
      Province: "",
      District: "",
      Sector: "",
      Cell: "",
      Village: ""
    },
    Comment: "",
    Found: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      LostPlace: {
        ...formData.LostPlace,
        [name]: value,
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://seekconnect-backend-1.onrender.com/lost', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        onSubmit(result.details);
      } else {
        const errorText = await response.text();
        console.error('Failed to post lost document:', response.status, errorText);
      }
    } catch (error) {
      console.error('Failed to post lost document:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      {/* Form fields */}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Document Type</label>
        <input
          type="text"
          name="DocumentType"
          value={formData.DocumentType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Name on Document</label>
        <input
          type="text"
          name="NameOnDocument"
          value={formData.NameOnDocument}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Place of Issue on Document</label>
        <input
          type="text"
          name="PlaceOfIssueOnDocument"
          value={formData.PlaceOfIssueOnDocument}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Lost Date</label>
        <input
          type="date"
          name="LostDate"
          value={formData.LostDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {/* Nested LostPlace fields */}
      <div className="mb-4">
        <label className="block text-gray-700">Lost Place - Country</label>
        <input
          type="text"
          name="Country"
          value={formData.LostPlace.Country}
          onChange={handleNestedChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Lost Place - Province</label>
        <input
          type="text"
          name="Province"
          value={formData.LostPlace.Province}
          onChange={handleNestedChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Lost Place - District</label>
        <input
          type="text"
          name="District"
          value={formData.LostPlace.District}
          onChange={handleNestedChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Lost Place - Sector</label>
        <input
          type="text"
          name="Sector"
          value={formData.LostPlace.Sector}
          onChange={handleNestedChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Lost Place - Cell</label>
        <input
          type="text"
          name="Cell"
          value={formData.LostPlace.Cell}
          onChange={handleNestedChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Lost Place - Village</label>
        <input
          type="text"
          name="Village"
          value={formData.LostPlace.Village}
          onChange={handleNestedChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Comment</label>
        <input
          type="text"
          name="Comment"
          value={formData.Comment}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default Post;
