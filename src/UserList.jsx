import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import Navbar from "./Navbar";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 shadow-lg mt-5 ">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 mb-5">
            <Link to={`/user/${user.id}`}>
              {" "}
              
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
                  <strong>Address:</strong> {user.address.address},{" "}
                  {user.address.suite}, {user.address.city}
                </p>
                <p className="mt-2">
                  <strong>Company:</strong> {user.company.name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
