import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    companyName: "",
    image: null
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: { address: formData.address },
      company: { name: formData.companyName },
      image: formData.image ? URL.createObjectURL(formData.image) : null
    };
  
    setUsers([...users, newUser]);
  
    Swal.fire("Success", "User added successfully", "success");
  
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      companyName: "",
      image: null
    });
  };
  

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const sortedUsers = users.slice().sort((a, b) => {
    if (sortBy === "name") {
      return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName);
    } else if (sortBy === "email") {
      return a.email.localeCompare(b.email);
    } else if (sortBy === "company") {
      return a.company.name.localeCompare(b.company.name);
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="m-5">
        <input
          type="text"
          placeholder="Search by name"
          className="border ml-4 border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-500 bg-white shadow-md"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={sortBy}
          onChange={handleSortBy}
          className="border ml-4 border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:border-blue-500 bg-white shadow-md"
          style={{ minWidth: "200px" }}
        >
          <option value="name">Sort by name</option>
          <option value="email">Sort by email</option>
          <option value="company">Sort by Company name</option>
        </select>
      </div>
      <form
        className="bg-white shadow-md rounded md:w-2/4 lg:w-1/4 mx-auto px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            placeholder="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add User
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <Link to={`/user/${user.id}`} className="block">
              <img
                src={user.image}
                alt={user.firstName}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <div className="text-center">
                <p className="font-bold text-lg text-blue-500">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <div className="mt-2 text-sm">
                  <p className="mb-1">
                    <strong className="text-gray-800">Address:</strong>{" "}
                    {user.address?.address}, {user.address?.suite},{" "}
                    {user.address?.city}
                  </p>
                  <p className="mb-1">
                    <strong className="text-gray-800">Company:</strong>{" "}
                    {user.company?.name}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
