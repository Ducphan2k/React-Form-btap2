import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    quantity: "",
  });
  const [editIndex, setEditIndex] = useState(-1);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(books[index]); // Set the form state with the content of the book being edited
  };

  const editBook = (values, index) => {
    const updatedBooks = [...books];
    updatedBooks[index] = values;
    setBooks(updatedBooks);
    setEditIndex(-1);
    setForm({ title: "", quantity: "" });
  };

  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  const onSubmitHandler = (values, { resetForm }) => {
    if (editIndex !== -1) {
      editBook(values, editIndex);
    } else {
      addBook(values);
    }
    resetForm();
  };

  return (
    <div className="container">
      <h1>Quản lý sách</h1>

      <Formik
        initialValues={{
          title: form.title,
          quantity: form.quantity,
        }}
        enableReinitialize={true} // Add this line to enable reinitialization of the form when the initialValues change
        validate={(values) => {
          // ... (previous validation code)
        }}
        onSubmit={onSubmitHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="title">
              <label htmlFor="title">Tiêu đề:</label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div className="quantity">
              <label htmlFor="quantity">Số lượng:</label>
              <Field type="number" id="quantity" name="quantity" />
              <ErrorMessage name="quantity" component="div" />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit"
              >
                {editIndex !== -1 ? "Update" : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div>
        <h2>Danh sách sách</h2>
        <table>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Số lượng</th>
              <th>Chỉnh sửa</th>
              <th>Xoá</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.quantity}</td>
                <td>
                  <button className="btn-update" onClick={() => handleEdit(index)}>Edit</button>
                </td>
                <td>
                  <button className="btn-delete" onClick={() => deleteBook(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;
