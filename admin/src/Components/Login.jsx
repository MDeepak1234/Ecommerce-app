import React, { useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { toast } from "react-toastify";

const Login = ({ settoken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backend_url}/api/user/admin`, {
        email,
        password,
      });

      if (res.data.success) {
        settoken(res.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel Login</h1>

        <form onSubmit={onSubmithandler}>
          {/* Email Input */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-gray-800"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-gray-800"
              type="password"
              placeholder="Enter the password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="mt-2 px-6 py-2 w-full text-sm bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition duration-200 cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
