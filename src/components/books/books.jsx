"use client";
import React, { useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { Badge, Modal, Form } from "antd";
import { CreateBook } from "./create-book";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const BooksComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        console.log("Form values:", values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container min-h-screen mx-auto py-5">
      {/* Header for books */}
      <div className="w-full flex items-center justify-between max-md:flex-col">
        <div className="text-white text-3xl flex items-start justify-start flex-col tracking-wide">
          <span>
            You{"'"}ve got <span className="text-[#6200EE]">7 book</span>
          </span>
          <span className="text-xl mt-4">Your books today</span>
        </div>
        <div>
          <Button
            className="mt-5 text-white flex items-center justify-center space-x-2"
            onClick={showModal}
          >
            <PiPlusBold />
            <span>Create a book</span>
          </Button>
        </div>
      </div>
      {/* Books */}
      <div className="w-full h-auto mt-10 flex items-start gap-3 justify-center flex-wrap">
        <Card sx={{ minWidth: 380, borderRadius: 3 }}>
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
        </Card>
        <Card sx={{ minWidth: 380, borderRadius: 3 }}>
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
        </Card>
        <Card sx={{ minWidth: 380, borderRadius: 3 }}>
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
              <Badge count="Finished" color="green" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        title="Create a new book"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CreateBook form={form} />
      </Modal>
    </div>
  );
};
