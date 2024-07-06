import React from "react";
import { Form, Input } from "antd";

export const CreateBook = ({ form }) => {
  return (
    <Form form={form} layout="vertical" name="book_form">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the book title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please input the book description!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="cover"
        label="Cover URL"
        rules={[{ required: true, message: "Please input the cover URL!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pages"
        label="Pages"
        rules={[
          { required: true, message: "Please input the number of pages!" },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="published"
        label="Published Year"
        rules={[
          { required: true, message: "Please input the published year!" },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="isbn"
        label="ISBN"
        rules={[{ required: true, message: "Please input the ISBN!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true, message: "Please input the author!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
