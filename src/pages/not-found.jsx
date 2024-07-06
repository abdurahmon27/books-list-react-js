import React from "react";
import NotFoundImage from "../assets/not-found.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  const refreshPage = () => {
    window.location.reload();
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <img  src={NotFoundImage} width={550} height={550} alt="404" />
      <div className="flex items-center justify-evenly mt-5 space-x-3">
        <Button variant="contained">
          <Link to={'/'}>Go Home Page</Link>
        </Button>
        <Button variant="outlined" onClick={refreshPage}>
          Reload Page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
