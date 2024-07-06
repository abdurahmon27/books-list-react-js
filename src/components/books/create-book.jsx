import React, { useState } from "react";
import { Button } from "@mui/material";
import { HOST } from "../../constants";

export const CreateBook = ({onClose}) => {
  const [isbn, setIsbn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const key = localStorage.getItem("authKey");
    const sign = localStorage.getItem("authSign");
    
    if (!key || !sign) {
      console.error("Authorization key or sign is missing.");
      return;
    }
    
    const myHeaders = new Headers();
    myHeaders.append("Key", key);
    myHeaders.append("Sign", sign);

    const raw = JSON.stringify({ isbn });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${HOST}/books`, requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="isbn" className="block text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex justify-between gap-2">
          <Button type="button" className="w-full" variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" className="w-full" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
