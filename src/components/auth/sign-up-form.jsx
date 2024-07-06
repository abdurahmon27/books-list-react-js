import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Button } from "@mui/material";
import CryptoJS from "crypto-js";
import { HOST } from "../../constants";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    // const key = CryptoJS.MD5(username + password).toString();
    // const raw = JSON.stringify({
    //   email: `${username}@gmail.com`,
    //   name: username,
    //   secret: password,
    //   key: key,
    // });
    // const sign = CryptoJS.MD5("POST" + "/signup" + raw + password).toString();

    // Crypto md5 hashingdan chiqarib bo'lmaydi decrypt qilib bo'lmaydi. lekin sizlar nima uchun bunaqa method ishlatgansizlar.)

    const key = CryptoJS.MD5(username + password).toString();
    const sign = CryptoJS.MD5(key + password).toString();

    console.log("key: ", key);
    console.log("sign: ", sign);

    const myHeaders = new Headers();
    myHeaders.append("Key", 'key12');
    myHeaders.append("Sign", 'sign12');
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: `${username}@gmail.com`,
      name: username,
      secret: password,
      key: key,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${HOST}/signup`, requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.text();
      console.log(result);

      localStorage.setItem("authKey", key);
      localStorage.setItem("authSign", sign);
      localStorage.setItem("username", username);

      navigate("/")

      console.log("Key and Sign saved to localStorage.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="z-10 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Sign Up
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
                placeholder="john doe"
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
                placeholder="Create password"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Repeat the password"
              />
            </div>
            <Button type="submit" className="w-full" variant="contained">
              Sign Up
            </Button>
            <p className="mt-2 text-sm text-center text-gray-600 font-thin">
              Already signed up?{" "}
              <Link
                to="/sign-in"
                className="font-thin text-indigo-600 hover:text-indigo-500"
              >
                Go to sign in.
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
