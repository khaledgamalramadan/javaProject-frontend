import { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/ui/Modal';
import StudentForm from '../components/forms/StudentForm';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';


export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);


  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  useEffect(() => {
    loadStudents();
  }, []);


  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/student/${id}`);
    loadStudents();
  };


  

  const loadStudents = async () => {
    try {
      const result = await axios.get('http://localhost:8080/students');
      setStudents(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAddOrUpdateStudent = (studentData) => {
    if (editingStudent) {
      setStudents(students.map(student =>
        student.id === editingStudent.id ? studentData : student
      ));
    } else {
      setStudents([...students, { ...studentData, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setEditingStudent(null);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(student => {
    const matchesName = student.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel ? student.level === filterLevel : true;
    return matchesName && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 sm:px-10">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center rounded-lg mb-6">
        <div className="flex items-center">
          <img src="/src/assets/logo.jpeg" alt="University Logo" className="h-12 mr-6" /> {/* زيادة الحجم إلى h-12 وزيادة المسافة باستخدام mr-6 */}
          <span className="text-xl font-bold">University Name</span>
        </div>
        <Link
          to="/logout"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200" // تعديل الزر
        >
          Logout
        </Link>
      </nav>



      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-blue-100 shadow-md p-4 rounded-lg mr-4">
          <h2 className="font-bold text-lg mb-4">Menu</h2>
          <ul>
            <li><Link to="/dashboard" className="block py-2 text-gray-700 hover:bg-blue-200 rounded">Dashboard</Link></li>
            <li><Link to="/students" className="block py-2 text-gray-700 hover:bg-blue-200 rounded">Students</Link></li>
            {/* أضف المزيد من الروابط حسب الحاجة */}
          </ul>
        </aside>

        {/* المحتوى الرئيسي */}
        <div className="flex-grow p-6">
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold text-gray-700">Admin Dashboard</h1>
              <Link onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
                to="/addstudent">
                + Add Student
              </Link>
            </div>

            {/* البحث والفلترة */}
            <div className="mb-6 flex gap-4">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Levels</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
              </select>
            </div>

            {/* جدول عرض الطلاب */}
            {filteredStudents.length > 0 ? (
              <div className="bg-gray-100 shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-50">
                    <tr>
                      {['Name', 'ID', 'Level', 'Visits', 'Training Days', 'Actions'].map(header => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-100 transition-colors duration-200">
                        <td className="px-6 py-4 text-gray-700 font-medium">{student.studentName}</td>
                        <td className="px-6 py-4 text-gray-500">{student.id}</td>
                        <td className="px-6 py-4 text-gray-500">{student.level}</td>
                        <td className="px-6 py-4 text-gray-500">{student.visits}/4</td>
                        <td className="px-6 py-4 text-gray-500">{student.trainingDays}/90</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <Link
                            onClick={() => handleEdit(student)}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            to={`/editstudent/${student.id}`}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => deleteStudent(student.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                No students match the search criteria.
              </div>
            )}

            {/* Modal لإضافة أو تعديل طالب */}
            <Modal
              isOpen={showModal}
              onClose={handleCloseModal}
              title={editingStudent ? 'Edit Student' : 'Add New Student'}
            >
              <StudentForm
                student={editingStudent}
                onSubmit={handleAddOrUpdateStudent}
                onCancel={handleCloseModal}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
