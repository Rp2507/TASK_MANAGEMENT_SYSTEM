import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addTask } from "../redux-toolkit/taskSlice";
import Modal from "./Modal";

const TaskForm = ({ task, isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();

  // Initial form values
  const initialValues = {
    title: task ? task.title : "",
    description: task ? task.description : "",
    priority: task ? task.priority : "low",
    dueDate: task ? task.dueDate : "",
  };

  // Yup validation
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    dueDate: Yup.string().required("Due Date is required"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    const updatedTask = {
      id: task ? task.id : Date.now(),
      title: values.title,
      description: values.description,
      priority: values.priority,
      dueDate: values.dueDate,
      completed: task ? task.completed : false,
      timeSpent: task ? task.timeSpent : 0,
    };

    if (task) {
      onSubmit(updatedTask);
    } else {
      dispatch(addTask(updatedTask));
    }

    onClose(); // Close the form after submitting
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ getFieldProps }) => (
            <Form className="p-4 border rounded shadow-sm bg-gray-50">
              <h2 className="text-xl font-semibold mb-4">
                {task ? "Edit Task" : "Create Task"}
              </h2>

              <label className="block mb-2">
                <span className="text-sm font-medium">Title:</span>
                <input
                  type="text"
                  {...getFieldProps("title")}
                  className="border rounded p-2 w-full mt-1"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </label>

              <label className="block mb-2">
                <span className="text-sm font-medium">Description:</span>
                <textarea
                  {...getFieldProps("description")}
                  className="border rounded p-2 w-full mt-1"
                />
              </label>

              <label className="block mb-2">
                <span className="text-sm font-medium">Priority:</span>
                <select
                  {...getFieldProps("priority")}
                  className="border rounded p-2 w-full mt-1"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label className="block mb-4">
                <span className="text-sm font-medium">Due Date:</span>
                <input
                  type="date"
                  {...getFieldProps("dueDate")}
                  className="border rounded p-2 w-full mt-1"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </label>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                {task ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default TaskForm;
