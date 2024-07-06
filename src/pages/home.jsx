import React, { useState, useEffect } from "react";
import { Header } from "../components/header";
import { BooksComponent } from "../components/books/books";
import SignUpForm from "../components/auth/sign-up-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const key = localStorage.getItem("authKey", "key");
    const sign = localStorage.getItem("authSign", "sign");
    const username = localStorage.getItem("username", "username");

    console.log(key, sign, username);

    if (username) {
      setName(username);
      setLoading(false);
    } else navigate("/sign-up");
  }, [name]);

  if (loading) {
    return (
      <div className="container h-screen absolute flex items-center justify-center gap-2 text-3xl">
        <AiOutlineLoading3Quarters className=" animate-spin filter" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SignUpForm />
      </div>
    );
  }

  return (
    <div className="">
      <Header username={name} />
      <BooksComponent books={books} />
    </div>
  );
};

export default Home;
