import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Transactions = () => {
  const [missingPeople, setMissingPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPerson, setEditingPerson] = useState(null);
  const [editForm, setEditForm] = useState({
    FirstName: "",
    LastName: "",
    Race: "",
    CountryOfOrigin: "",
    Age: "",
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchMissingPeople = async () => {
      try {
        const response = await axios.get(
          "https://seekconnect-backend-1.onrender.com/missingPeople"
        );
        console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data.people)) {
          setMissingPeople(response.data.people);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchMissingPeople();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://seekconnect-backend-1.onrender.com/missingPerson?id=${id}`);
      setMissingPeople(missingPeople.filter(person => person._id !== id));
    } catch (error) {
      console.error("Error deleting person:", error);
      setError("Error deleting person");
    }
  };

  const handleUpdateClick = (person) => {
    setEditingPerson(person);
    setEditForm({ ...person, LostPlace: { ...person.LostPlace } });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("LostPlace.")) {
      const placeField = name.split(".")[1];
      setEditForm((prevForm) => ({
        ...prevForm,
        LostPlace: { ...prevForm.LostPlace, [placeField]: value }
      }));
    } else {
      setEditForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://seekconnect-backend-1.onrender.com/missingPeople/${editingPerson._id}`,
        editForm
      );
      setMissingPeople(missingPeople.map((person) =>
        person._id === editingPerson._id ? response.data.person : person
      ));
      setEditingPerson(null);
    } catch (error) {
      console.error("Error updating person:", error);
      setError("Error updating person");
    }
  };

  const handleCancelUpdate = () => {
    setEditingPerson(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the indices of items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = missingPeople.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(missingPeople.length / itemsPerPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen mt-20 flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-7xl w-full mb-40 p-4 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          List of Missing People
        </h2>
        {missingPeople.length === 0 ? (
          <p className="text-center">No missing people found.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentItems.map((person) => {
                const lostPlace = person.LostPlace || {};
                return (
                  <div key={person._id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <div className="flex justify-center">
                      {person.Photo && person.Photo.url ? (
                        <img
                          src={person.Photo.url}
                          alt={`${person.FirstName} ${person.LastName}`}
                          className="h-32 w-48 object-cover rounded-sm mb-4"
                        />
                      ) : (
                        <div className="h-32 w-32 flex items-center justify-center bg-gray-200 mb-4">
                          <span>No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="">
                      <h3 className="text-xl font-semibold">{person.FirstName} {person.LastName}</h3>
                      <p className="text-sm"><span className="font-bold">Race:</span> {person.Race}</p>
                      <p className="text-sm"><span className="font-bold">Country of Origin:</span> {person.CountryOfOrigin}</p>
                      <p className="text-sm"><span className="font-bold">Age:</span> {person.Age}</p>
                      <p className="text-sm"><span className="font-bold">Lost Date:</span> {person.LostDate}</p>
                      <p className="text-sm"><span className="font-bold">Lost Place:</span> {`${lostPlace.Country || "N/A"}, ${lostPlace.Province || "N/A"}, ${lostPlace.District || "N/A"}, ${lostPlace.Sector || "N/A"}, ${lostPlace.Cell || "N/A"}, ${lostPlace.Village || "N/A"}`}</p>
                      <p className="text-sm"><span className="font-bold">Comment:</span> {person.Comment}</p>
                      <p className="text-sm"><span className="font-bold">Found:</span> {person.Found ? "Yes" : "No"}</p>
                      <div className="mt-4 flex justify-center space-x-2">
                        <button
                          onClick={() => handleUpdateClick(person)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(person._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center mt-8">
              <button
                className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-[#8a9de9] text-white"}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              <span className="mx-2 text-lg">
                {currentPage} of {totalPages}
              </span>
              <button
                className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-100" : "bg-[#8a9de9] text-white"}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
      {editingPerson && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-md">
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  value={editForm.FirstName}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  value={editForm.LastName}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              {/* Add other fields similarly */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleCancelUpdate}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Transactions = () => {
//   const [missingPeople, setMissingPeople] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingPerson, setEditingPerson] = useState(null);
//   const [editForm, setEditForm] = useState({
//     FirstName: "",
//     LastName: "",
//     Race: "",
//     CountryOfOrigin: "",
//     Age: "",
//     LostDate: "",
//     LostPlace: {
//       Country: "",
//       Province: "",
//       District: "",
//       Sector: "",
//       Cell: "",
//       Village: ""
//     },
//     Comment: "",
//     Found: false
//   });

//   useEffect(() => {
//     const fetchMissingPeople = async () => {
//       try {
//         const response = await axios.get(
//           "https://seekconnect-backend-1.onrender.com/missingPeople"
//         );
//         console.log("API response:", response.data);

//         if (response.data && Array.isArray(response.data.people)) {
//           setMissingPeople(response.data.people);
//         } else {
//           setError("Unexpected response format");
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Error fetching data");
//         setLoading(false);
//       }
//     };

//     fetchMissingPeople();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://seekconnect-backend-1.onrender.com/missingPerson?id=${id}`);
//       setMissingPeople(missingPeople.filter(person => person._id !== id));
//     } catch (error) {
//       console.error("Error deleting person:", error);
//       setError("Error deleting person");
//     }
//   };

//   const handleUpdateClick = (person) => {
//     setEditingPerson(person);
//     setEditForm({ ...person, LostPlace: { ...person.LostPlace } });
//   };

//   const handleUpdateChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes("LostPlace.")) {
//       const placeField = name.split(".")[1];
//       setEditForm((prevForm) => ({
//         ...prevForm,
//         LostPlace: { ...prevForm.LostPlace, [placeField]: value }
//       }));
//     } else {
//       setEditForm((prevForm) => ({
//         ...prevForm,
//         [name]: value
//       }));
//     }
//   };

//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `https://seekconnect-backend-1.onrender.com/missingPeople/${editingPerson._id}`,
//         editForm
//       );
//       setMissingPeople(missingPeople.map((person) =>
//         person._id === editingPerson._id ? response.data.person : person
//       ));
//       setEditingPerson(null);
//     } catch (error) {
//       console.error("Error updating person:", error);
//       setError("Error updating person");
//     }
//   };

//   const handleCancelUpdate = () => {
//     setEditingPerson(null);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="min-h-screen mt-20 flex flex-col items-center justify-center bg-gray-100">
//       <div className="max-w-7xl w-full mb-40 p-4 rounded-md bg-white shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           List of Missing People
//         </h2>
//         {missingPeople.length === 0 ? (
//           <p className="text-center">No missing people found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {missingPeople.map((person) => {
//               const lostPlace = person.LostPlace || {};
//               return (
//                 <div key={person._id} className="bg-gray-200 p-4 rounded-lg shadow-md">
//                   <div className="flex justify-center">
//                     {person.Photo && person.Photo.url ? (
//                       <img
//                         src={person.Photo.url}
//                         alt={`${person.FirstName} ${person.LastName}`}
//                         className="h-32 w-48 object-cover rounded-sm   mb-4"
//                       />
//                     ) : (
//                       <div className="h-32 w-32 flex items-center justify-center bg-gray-200 mb-4">
//                         <span>No Image</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="">
//                     <h3 className="text-xl font-semibold">{person.FirstName} {person.LastName}</h3>
//                     {/* <p className="text-sm"><span className="font-bold">User ID:</span> {person.UserId}</p> */}
//                     <p className="text-sm"><span className="font-bold">Race:</span> {person.Race}</p>
//                     <p className="text-sm"><span className="font-bold">Country of Origin:</span> {person.CountryOfOrigin}</p>
//                     <p className="text-sm"><span className="font-bold">Age:</span> {person.Age}</p>
//                     <p className="text-sm"><span className="font-bold">Lost Date:</span> {person.LostDate}</p>
//                     <p className="text-sm"><span className="font-bold">Lost Place:</span> {`${lostPlace.Country || "N/A"}, ${lostPlace.Province || "N/A"}, ${lostPlace.District || "N/A"}, ${lostPlace.Sector || "N/A"}, ${lostPlace.Cell || "N/A"}, ${lostPlace.Village || "N/A"}`}</p>
//                     <p className="text-sm"><span className="font-bold">Comment:</span> {person.Comment}</p>
//                     <p className="text-sm"><span className="font-bold">Found:</span> {person.Found ? "Yes" : "No"}</p>
//                     <div className="mt-4 flex justify-center space-x-2">
//                       <button
//                         onClick={() => handleUpdateClick(person)}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                       >
//                         Update
//                       </button>
//                       <button
//                         onClick={() => handleDelete(person._id)}
//                         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//       {editingPerson && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//           <div className="bg-white p-6 rounded-md shadow-md">
//             <form onSubmit={handleUpdateSubmit}>
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">First Name</label>
//                 <input
//                   type="text"
//                   name="FirstName"
//                   value={editForm.FirstName}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Last Name</label>
//                 <input
//                   type="text"
//                   name="LastName"
//                   value={editForm.LastName}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               {/* Repeat similar blocks for other fields */}
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Race</label>
//                 <input
//                   type="text"
//                   name="Race"
//                   value={editForm.Race}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Country of Origin</label>
//                 <input
//                   type="text"
//                   name="CountryOfOrigin"
//                   value={editForm.CountryOfOrigin}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Age</label>
//                 <input
//                   type="number"
//                   name="Age"
//                   value={editForm.Age}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Lost Date</label>
//                 <input
//                   type="date"
//                   name="LostDate"
//                   value={editForm.LostDate}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               {/* Lost Place fields */}
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Lost Place - Country</label>
//                 <input
//                   type="text"
//                   name="LostPlace.Country"
//                   value={editForm.LostPlace.Country}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               {/* Repeat similar blocks for other Lost Place fields */}
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Comment</label>
//                 <input
//                   type="text"
//                   name="Comment"
//                   value={editForm.Comment}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="block text-gray-700 font-medium">Found</label>
//                 <select
//                   name="Found"
//                   value={editForm.Found}
//                   onChange={handleUpdateChange}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
//                 >
//                   <option value={true}>Yes</option>
//                   <option value={false}>No</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={handleCancelUpdate}
//                   className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Transactions;
