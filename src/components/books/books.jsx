// Karoche I know code is sucks but your API doesn't work, or I can't use it properly



"use client";
import React, { useState, useEffect } from "react";
import { PiPlusBold } from "react-icons/pi";
import { Badge, Modal } from "antd";
import { CreateBook } from "./create-book";
import { Button, Input } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { HOST } from "../../constants";

export const BooksComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBook, setHoveredBook] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const fetchBooks = async () => {
    const key = localStorage.getItem("authKey");
    const sign = localStorage.getItem("authSign");

    if (!key || !sign) {
      console.error("Authorization key or sign is missing.");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Key", key);
    myHeaders.append("Sign", sign);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${HOST}/books`, requestOptions);
      const result = await response.json();
      setBooks(result);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBookCreated = () => {
    fetchBooks();
    setIsModalVisible(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredBook(index);
  };

  const handleMouseLeave = () => {
    setHoveredBook(null);
  };

  const handleEditBook = (book) => {
    setCurrentBook(book);
    setIsEditModalVisible(true);
  };

  const handleDeleteBook = (book) => {
    // Assuming you have an endpoint to delete a book
    const key = localStorage.getItem("authKey");
    const sign = localStorage.getItem("authSign");

    if (!key || !sign) {
      console.error("Authorization key or sign is missing.");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Key", key);
    myHeaders.append("Sign", sign);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${HOST}/books/${book.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setBooks(books.filter((b) => b.id !== book.id));
      })
      .catch((error) => console.error("error", error));
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setCurrentBook(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container min-h-screen mx-auto py-5">
      {/* Header for books */}
      <div className="w-full flex items-center justify-between max-md:flex-col">
        <div className="text-white text-3xl flex items-start justify-start flex-col tracking-wide">
          <span>
            You{"'"}ve got{" "}
            <span className="text-[#6200EE]">{books.length} books</span>
          </span>
          <span className="text-xl mt-4">Your books today</span>
        </div>
        <div>
          <Button
            className="mt-5 text-white flex items-center justify-center space-x-2"
            onClick={showModal}
            variant="contained"
          >
            <PiPlusBold />
            <span>Create a book</span>
          </Button>
        </div>
      </div>
      {/* Books */}
      {/* MAPPING EXAMPLE FOR BOOKS, BUT API DOESN'T WORK PROPERLY */}
      {/* <div className="w-full h-auto mt-10 flex items-start gap-3 justify-center flex-wrap">
        {books.map((book, index) => (
          <Card
            key={index}
            sx={{ minWidth: 380, borderRadius: 3 }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <CardContent>
              <div className="font-semibold text-xl">
                <span>{book.title}</span>
              </div>
              <div>
                <ul className="flex flex-col gap-2 text-xs my-3">
                  <li>Cover: {book.cover}</li>
                  <li>Pages: {book.pages}</li>
                  <li>Published: {book.published}</li>
                  <li>Isbn: {book.isbn}</li>
                </ul>
              </div>
              <div className="flex justify-between text-sm">
                <span>
                  {book.author} / {book.year}
                </span>
                <Badge count={book.status} color="blue" />
              </div>
              {hoveredBook === index && (
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outlined" size="small" onClick={() => handleEditBook(book)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleDeleteBook(book)}>
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div> */}

      <div className="w-full h-auto mt-10 flex items-start gap-3 justify-center flex-wrap">
        <Card
          sx={{ minWidth: 380, borderRadius: 3, height: 200 }}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <CardContent>
            <div className="font-semibold text-xl">
              <span>Book title</span>
            </div>
            <div>
              <ul className="flex flex-col gap-2 text-xs my-3">
                <li>Cover: http://url.to.book.cover</li>
                <li>Pages: 350</li>
                <li>Published: 2021</li>
                <li>Isbn: 123456789</li>
              </ul>
            </div>
            <div className="flex justify-between  text-sm">
              <span>William Shakespeare / 2012</span>
              <Badge count="Reading" color="yellow" />
            </div>
          </CardContent>
          {hoveredBook === 1 && (
            <div className={`flex justify-end absolute top-1 right-1 gap-1`}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleEditBook(books[0])}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDeleteBook(books[0])}
              >
                Delete
              </Button>
            </div>
          )}
        </Card>
        <Card
          sx={{ minWidth: 380, borderRadius: 3, height: 200 }}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <CardContent>
            <div className="font-semibold text-xl">
              <span>Book title</span>
            </div>
            <div>
              <ul className="flex flex-col gap-2 text-xs my-3">
                <li>Cover: http://url.to.book.cover</li>
                <li>Pages: 350</li>
                <li>Published: 2021</li>
                <li>Isbn: 123456789</li>
              </ul>
            </div>
            <div className="flex justify-between  text-sm">
              <span>William Shakespeare / 2012</span>
              <Badge count="New" color="red" />
            </div>
          </CardContent>
          {hoveredBook === 2 && (
            <div className={`flex justify-end absolute top-1 right-1 gap-1`}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleEditBook(books[1])}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDeleteBook(books[1])}
              >
                Delete
              </Button>
            </div>
          )}
        </Card>
        <Card
          sx={{ minWidth: 380, borderRadius: 3, height: 200 }}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <CardContent>
            <div className="font-semibold text-xl">
              <span>Book title</span>
            </div>
            <div>
              <ul className="flex flex-col gap-2 text-xs my-3">
                <li>Cover: http://url.to.book.cover</li>
                <li>Pages: 350</li>
                <li>Published: 2021</li>
                <li>Isbn: 123456789</li>
              </ul>
            </div>
            <div className="flex justify-between  text-sm">
              <span>William Shakespeare / 2012</span>
              <Badge count="Reading" color="yellow" />
            </div>
          </CardContent>
          {hoveredBook === 3 && (
            <div className={`flex justify-end absolute top-1 right-1 gap-1`}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleEditBook(books[2])}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDeleteBook(books[2])}
              >
                Delete
              </Button>
            </div>
          )}
        </Card>
      </div>

      <Modal
        title="Create a new book"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateBook onClose={handleBookCreated} />
      </Modal>

      <Modal
        title="Edit Book"
        open={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <EditBook book={currentBook} onClose={handleEditModalCancel} />
      </Modal>
    </div>
  );
};

const EditBook = ({ book, onClose }) => {
  const [form, setForm] = useState({
    title: book?.title || "",
    cover: book?.cover || "",
    pages: book?.pages || "",
    published: book?.published || "",
    isbn: book?.isbn || "",
    author: book?.author || "",
    year: book?.year || "",
    status: book?.status || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

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
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(form),
      redirect: "follow",
    };

    try {
      const response = await fetch(`${HOST}/books`, requestOptions);
      const result = await response.json();
      onClose();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label>ISBN</label>
        <Input name="isbn" value={form.isbn} onChange={handleChange} />
        <div className="flex justify-end mt-4">
          <Button type="submit" variant="contained">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
