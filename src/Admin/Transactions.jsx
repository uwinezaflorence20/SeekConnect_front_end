import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);

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
      setModalMessage("The lost person has been successfully deleted.");
      setModalSuccess(true);
    } catch (error) {
      console.error("Error deleting person:", error);
      setError("Error deleting person");
      setModalMessage("Failed to delete the lost person.");
      setModalSuccess(false);
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
    const formData = new FormData();
    formData.append("Email", editForm.Email);
    formData.append("FirstName", editForm.FirstName);
    formData.append("LastName", editForm.LastName);
    formData.append("Race", editForm.Race);
    formData.append("CountryOfOrigin", editForm.CountryOfOrigin);
    formData.append("Age", editForm.Age);
    formData.append("LostDate", editForm.LostDate);
    formData.append("LostPlace.Country", editForm.LostPlace.Country);
    formData.append("LostPlace.Province", editForm.LostPlace.Province);
    formData.append("LostPlace.District", editForm.LostPlace.District);
    formData.append("LostPlace.Sector", editForm.LostPlace.Sector);
    formData.append("LostPlace.Cell", editForm.LostPlace.Cell);
    formData.append("LostPlace.Village", editForm.LostPlace.Village);
    formData.append("Comment", editForm.Comment);
    formData.append("Found", editForm.Found);

    try {
      const response = await axios.patch(
        `https://seekconnect-backend-1.onrender.com/missingPerson?id=${editingPerson._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setMissingPeople(missingPeople.map((person) =>
        person._id === editingPerson._id ? response.data.updatedData : person
      ));
      setEditingPerson(null);
      setModalMessage("The lost person has been successfully updated.");
      setModalSuccess(true);
    } catch (error) {
      console.error("Error updating person:", error);
      setError("Error updating person");
      setModalMessage("Failed to update the lost person.");
      setModalSuccess(false);
    }
  };

  const handleCancelUpdate = () => {
    setEditingPerson(null);
  };

  const closeModal = () => {
    setModalMessage("");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="max-w-7xl w-full p-4 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          List of Missing People
        </h2>
        {missingPeople.length === 0 ? (
          <p className="text-center">No missing people found.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {missingPeople.map((person) => {
                const lostPlace = person.LostPlace || {};
                return (
                  <div key={person._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
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
          </div>
        )}
      </div>
      {editingPerson && (
        <div className="max-w-7xl w-full p-4 rounded-md bg-white shadow-md mt-6">
          <h3 className="text-lg font-bold mb-4">Update Missing Person</h3>
          <form onSubmit={handleUpdateSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Race</label>
                <input
                  type="text"
                  name="Race"
                  value={editForm.Race}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Country of Origin</label>
                <input
                  type="text"
                  name="CountryOfOrigin"
                  value={editForm.CountryOfOrigin}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Age</label>
                <input
                  type="number"
                  name="Age"
                  value={editForm.Age}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Lost Date</label>
                <input
                  type="date"
                  name="LostDate"
                  value={editForm.LostDate}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Lost Place Country</label>
                <input
                  type="text"
                  name="LostPlace.Country"
                  value={editForm.LostPlace.Country}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Lost Place Province</label>
                <input
                  type="text"
                  name="LostPlace.Province"
                  value={editForm.LostPlace.Province}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Lost Place District</label>
                <input
                  type="text"
                  name="LostPlace.District"
                  value={editForm.LostPlace.District}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Lost Place Sector</label>
                <input
                  type="text"
                  name="LostPlace.Sector"
                  value={editForm.LostPlace.Sector}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Lost Place Cell</label>
                <input
                  type="text"
                  name="LostPlace.Cell"
                  value={editForm.LostPlace.Cell}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Lost Place Village</label>
                <input
                  type="text"
                  name="LostPlace.Village"
                  value={editForm.LostPlace.Village}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Comment</label>
                <textarea
                  name="Comment"
                  value={editForm.Comment}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium">Found</label>
                <select
                  name="Found"
                  value={editForm.Found}
                  onChange={handleUpdateChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>
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
      )}
      {modalMessage && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Notification
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{modalMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${modalSuccess ? "bg-green-500" : "bg-red-500"} text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
