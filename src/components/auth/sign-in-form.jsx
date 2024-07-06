import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@mui/material";
import CryptoJS from "crypto-js";
import { API_KEY } from "../../constants";

const HOST = "https://no23.lavina.tech";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = CryptoJS.MD5(username + password).toString();
    const sign = CryptoJS.MD5(key + password).toString();

    console.log("key: ", key);
    console.log("sign: ", sign);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Key: key,
        Sign: sign,
      
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch(`${HOST}/myself`, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUserInfo(result);
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="z-10 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Sign in
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the password"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" variant="contained">
              Sign in
            </Button>
            <p className="mt-2 text-sm text-center text-gray-600 font-thin">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-thin text-indigo-600 hover:text-indigo-500"
              >
                Go to sign up.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
