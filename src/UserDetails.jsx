import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { IoArrowBack } from "react-icons/io5";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="ml-5 mb-10">
        <Link to="/" className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <IoArrowBack className="mr-2" /> Go Back
          </button>
        </Link>
      </div>
      <img
        src={user.image}
        alt={user.firstName}
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <div className="text-center">
        <p className="font-bold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2">
          <strong>Address:</strong> {user.address.address}, {user.address.suite}
          , {user.address.city}
        </p>
        <p className="mt-2">
          <strong>Company:</strong> {user.company.name}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
