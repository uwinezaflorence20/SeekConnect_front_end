import React, { useState } from "react";

const Founddoc = () => {
  const initialState = {
    file: null,
    UserId: "",
    DocumentType: "Drivers License",
    NameOnDocument: "",
    PlaceOfIssueOnDocument: "",
    FoundDate: "",
    FoundPlace: {
      Country: "",
      Province: "",
      District: "",
      Sector: "",
      Cell: "",
      Village: "",
    },
    Comment: "",
    returnedToOwner: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("FoundPlace.")) {
      const key = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        FoundPlace: {
          ...prevState.FoundPlace,
          [key]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
    setErrors({
      ...errors,
      file: "",
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.file) {
      newErrors.file = "File is required";
      valid = false;
    }

    if (!formData.UserId.trim()) {
      newErrors.UserId = "User ID is required";
      valid = false;
    }

    if (!formData.DocumentType.trim()) {
      newErrors.DocumentType = "Document type is required";
      valid = false;
    }

    if (!formData.NameOnDocument.trim()) {
      newErrors.NameOnDocument = "Name on document is required";
      valid = false;
    }

    if (!formData.PlaceOfIssueOnDocument.trim()) {
      newErrors.PlaceOfIssueOnDocument =
        "Place of issue on document is required";
      valid = false;
    }

    if (!formData.FoundDate.trim()) {
      newErrors.FoundDate = "Found date is required";
      valid = false;
    }

    if (!formData.FoundPlace.Country.trim()) {
      newErrors["FoundPlace.Country"] =
        "Country where the document was found is required";
      valid = false;
    }

    if (!formData.FoundPlace.Province.trim()) {
      newErrors["FoundPlace.Province"] =
        "Province where the document was found is required";
      valid = false;
    }

    if (!formData.FoundPlace.District.trim()) {
      newErrors["FoundPlace.District"] =
        "District where the document was found is required";
      valid = false;
    }

    if (!formData.FoundPlace.Sector.trim()) {
      newErrors["FoundPlace.Sector"] =
        "Sector where the document was found is required";
      valid = false;
    }

    if (!formData.FoundPlace.Cell.trim()) {
      newErrors["FoundPlace.Cell"] =
        "Cell where the document was found is required";
      valid = false;
    }

    if (!formData.FoundPlace.Village.trim()) {
      newErrors["FoundPlace.Village"] =
        "Village where the document was found is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = new FormData();
    data.append("file", formData.file);
    data.append("UserId", formData.UserId);
    data.append("DocumentType", formData.DocumentType);
    data.append("NameOnDocument", formData.NameOnDocument);
    data.append("PlaceOfIssueOnDocument", formData.PlaceOfIssueOnDocument);
    data.append("FoundDate", formData.FoundDate);
    data.append("FoundPlace.Country", formData.FoundPlace.Country);
    data.append("FoundPlace.Province", formData.FoundPlace.Province);
    data.append("FoundPlace.District", formData.FoundPlace.District);
    data.append("FoundPlace.Sector", formData.FoundPlace.Sector);
    data.append("FoundPlace.Cell", formData.FoundPlace.Cell);
    data.append("FoundPlace.Village", formData.FoundPlace.Village)
    data.append("Comment", formData.Comment);
    data.append("returnedToOwner", formData.returnedToOwner);

    console.log("Form data submitted:", formData); // Here you can handle the form data, e.g., send it to a server
    try {
      const response = await fetch(
        "https://seekconnect-backend-1.onrender.com/foundDocument",
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      console.log("Form data submitted successfully");
      // Optionally, you can handle success response here
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      // Optionally, you can handle error here
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full mb-40 p-6 rounded-md bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Report Found Document
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 font-medium">
              Photo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.file ? "border-red-500" : ""
              }`}
            />
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700 font-medium">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="UserId"
              value={formData.UserId}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.UserId ? "border-red-500" : ""
              }`}
            />
            {errors.UserId && (
              <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="DocumentType"
              className="block text-gray-700 font-medium"
            >
              Document Type
            </label>
            <select
              id="documentType"
              name="DocumentType"
              value={formData.DocumentType}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.DocumentType ? "border-red-500" : ""
              }`}
            >
              <option value="Drivers License">Drivers License</option>
              <option value="National Id Card">National Id Card</option>
              <option value="Health Insurance Card">
                Health Insurance Card
              </option>
              <option value="Refugee Identity Document">
                Refugee Identity Document
              </option>
              <option value="Other Form Of Identity">
                Other Form Of Identity
              </option>
            </select>
            {errors.DocumentType && (
              <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="NameOnDocument"
              className="block text-gray-700 font-medium"
            >
              Name on Document
            </label>
            <input
              type="text"
              id="nameOnDocument"
              name="NameOnDocument"
              value={formData.NameOnDocument}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.NameOnDocument ? "border-red-500" : ""
              }`}
            />
            {errors.NameOnDocument && (
              <p className="text-red-500 text-sm mt-1">
                {errors.NameOnDocument}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="PlaceOfIssueOnDocument"
              className="block text-gray-700 font-medium"
            >
              Place of Issue on Document
            </label>
            <input
              type="text"
              id="placeOfIssueOnDocument"
              name="PlaceOfIssueOnDocument"
              value={formData.PlaceOfIssueOnDocument}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.PlaceOfIssueOnDocument ? "border-red-500" : ""
              }`}
            />
            {errors.PlaceOfIssueOnDocument && (
              <p className="text-red-500 text-sm mt-1">
                {errors.PlaceOfIssueOnDocument}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="FoundDate"
              className="block text-gray-700 font-medium"
            >
              Found Date
            </label>
            <input
              type="date"
              id="foundDate"
              name="FoundDate"
              value={formData.FoundDate}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.FoundDate ? "border-red-500" : ""
              }`}
            />
            {errors.FoundDate && (
              <p className="text-red-500 text-sm mt-1">{errors.foundDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="FoundPlace.country"
              className="block text-gray-700 font-medium"
            >
              Country where Document was Found
            </label>
            <input
              type="text"
              id="foundPlace.country"
              name="FoundPlace.Country"
              value={formData.FoundPlace.Country}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["FoundPlace.Country"] ? "border-red-500" : ""
              }`}
            />
            {errors["FoundPlace.Country"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["FoundPlace.Country"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="FoundPlace.Province"
              className="block text-gray-700 font-medium"
            >
              Province where Document was Found
            </label>
            <input
              type="text"
              id="foundPlace.province"
              name="FoundPlace.Province"
              value={formData.FoundPlace.Province}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["FoundPlace.Province"] ? "border-red-500" : ""
              }`}
            />
            {errors["FoundPlace.Province"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["FoundPlace.Province"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="FoundPlace.District"
              className="block text-gray-700 font-medium"
            >
              District where Document was Found
            </label>
            <input
              type="text"
              id="foundPlace.district"
              name="FoundPlace.District"
              value={formData.FoundPlace.District}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["FoundPlace.District"] ? "border-red-500" : ""
              }`}
            />
            {errors["FoundPlace.District"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["FoundPlace.District"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="FoundPlace.Sector"
              className="block text-gray-700 font-medium"
            >
              Sector where Document was Found
            </label>
            <input
              type="text"
              id="foundPlace.sector"
              name="FoundPlace.Sector"
              value={formData.FoundPlace.Sector}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["FoundPlace.Sector"] ? "border-red-500" : ""
              }`}
            />
            {errors["FoundPlace.Sector"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["FoundPlace.Sector"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="FoundPlace.Cell"
              className="block text-gray-700 font-medium"
            >
              Cell where Document was Found
            </label>
            <input
              type="text"
              id="foundPlace.cell"
              name="FoundPlace.Cell"
              value={formData.FoundPlace.Cell}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["FoundPlace.Cell"] ? "border-red-500" : ""
              }`}
            />
            {errors["FoundPlace.Cell"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["FoundPlace.Cell"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="FoundPlace.Village"
              className="block text-gray-700 font-medium"
            >
              Village where Document was Found
            </label>
            <input
              type="text"
              id="foundPlace.village"
              name="FoundPlace.Village"
              value={formData.FoundPlace.Village}
              onChange={handleChange}
              className={`mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                errors["FoundPlace.Village"] ? "border-red-500" : ""
              }`}
            />
            {errors["FoundPlace.Village"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["FoundPlace.Village"]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="Comment"
              className="block text-gray-700 font-medium"
            >
              Additional Comments or Details
            </label>
            <textarea
              id="comment"
              name="Comment"
              value={formData.Comment}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="returnedToOwner"
              className="block text-gray-700 font-medium"
            >
              Returned to Owner
            </label>
            <input
              type="checkbox"
              id="returnedToOwner"
              name="returnedToOwner"
              checked={formData.returnedToOwner}
              onChange={handleChange}
              className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Founddoc;