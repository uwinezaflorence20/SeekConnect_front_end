import React, { useEffect, useState } from "react";
import { IoBagHandle, IoPeople, IoDocument, IoPerson } from "react-icons/io5";
import { FaUsers, FaFileAlt } from "react-icons/fa";

function DashboardStatsGrid() {
  const [totalLostItems, setTotalLostItems] = useState(0);
  const [totalFoundItems, setTotalFoundItems] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalLostPersons, setTotalLostPersons] = useState(0);
  const [totalFoundPersons, setTotalFoundPersons] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setState, property, description) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Error fetching ${description}: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log(`${description} data:`, data); // Debug log to see the fetched data
        setState(data[property]?.length || 0); // Handle undefined property case
      } catch (error) {
        console.error(error);
        setError(`Error fetching ${description}`);
      }
    };

    fetchData(
      "https://seekconnect-backend-1.onrender.com/lost",
      setTotalLostItems,
      "documents",
      "lost items"
    );
    fetchData(
      "https://seekconnect-backend-1.onrender.com/foundDocuments",
      setTotalFoundItems,
      "foundDocuments",
      "found items"
    );
    fetchData(
      "https://seekconnect-backend-1.onrender.com/users",
      setTotalUsers,
      "users",
      "users"
    );
    fetchData(
      "https://seekconnect-backend-1.onrender.com/missingPeople",
      setTotalLostPersons,
      "people",
      "lost persons"
    );
    fetchData(
      "https://seekconnect-backend-1.onrender.com/foundMissingPeople",
      setTotalFoundPersons,
      "missedPeople",
      "found persons"
    );
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BoXWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-500">
          <FaFileAlt className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Lost Document Items
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {error ? "Error" : totalLostItems}
            </strong>
          </div>
        </div>
      </BoXWrapper>
      <BoXWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <FaFileAlt className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Found Document Items
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {error ? "Error" : totalFoundItems}
            </strong>
          </div>
        </div>
      </BoXWrapper>
      <BoXWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
          <FaUsers className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Users</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {error ? "Error" : totalUsers}
            </strong>
          </div>
        </div>
      </BoXWrapper>
      <BoXWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
          <IoPerson className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Lost Persons
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {error ? "Error" : totalLostPersons}
            </strong>
          </div>
        </div>
      </BoXWrapper>
      <BoXWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-purple-500">
          <IoPerson className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Found Persons
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {error ? "Error" : totalFoundPersons}
            </strong>
          </div>
        </div>
      </BoXWrapper>
      <BoXWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Returned Items
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">0</strong>
          </div>
        </div>
      </BoXWrapper>
    </div>
  );
}

function BoXWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border-gray-200 flex items-center shadow-md">
      {children}
    </div>
  );
}

export default DashboardStatsGrid;
