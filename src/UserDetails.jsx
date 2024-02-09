import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { IoArrowBack } from "react-icons/io5";
import { motion } from "framer-motion";

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
      <Navbar />
      <div className="ml-5 mb-10">
        <Link to="/" className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <IoArrowBack className="mr-2" /> Go Back
          </button>
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={user.image}
          alt={user.firstName}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <div className="text-center">
          <p className="font-bold text-2xl text-blue-500">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-600 text-lg">{user.email}</p>
          <div className="mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg"
            >
              <strong>Address:</strong> {user.address.address},{" "}
              {user.address.suite}, {user.address.city}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg"
            >
              <strong>Company:</strong> {user.company.name}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetails;
