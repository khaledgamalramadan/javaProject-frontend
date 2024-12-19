// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentForm() {
  const [student, setStudent] = useState({
    studentName: "",
    id: "",
    level: "",
    studentEmail: "",
    studentPassword: "",
    visits: 0,
    trainingDays: 0,
  });

  const navigate = useNavigate(); // Initialize navigate
  const { studentName, id, level, studentEmail, studentPassword, visits, trainingDays } = student;

  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/student", student);
    alert("student added sucss");
    navigate("/");
  };


  const onCancel = () => {
    navigate("/"); // Redirect to the home page or list page
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-blue-50 p-6 rounded-lg shadow-lg max-w-lg mx-auto border border-blue-200"
    >
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {student ? "Update Student Information" : "Add New Student"}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="studentName"
            value={studentName}
            onChange={onInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            value={id}
            onChange={onInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student ID"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Level
          </label>
          <input
            type="text"
            name="level"
            value={level}
            onChange={onInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student level"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="studentEmail"
            value={studentEmail}
            onChange={onInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter student email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="studentPassword"
            value={studentPassword}
            onChange={onInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Visits (0-4)
          </label>
          <input
            type="number"
            name="visits"
            min="0"
            max="4"
            value={visits}
            onChange={onInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Number of visits"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Training Days
          </label>
          <input
            type="number"
            name="trainingDays"
            min="1"
            max="90"
            value={trainingDays}
            onChange={onInputChange}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Number of training days"
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Add Student
        </button>
      </div>
    </form>
  );
}
