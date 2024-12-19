import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentForm from './components/forms/StudentForm';
import EditStudent from './components/forms/EditStudent';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addstudent" element={<StudentForm />} />
        <Route path="/editstudent/:id" element={<EditStudent />} />
        
      </Routes>
    </Router>
  );
}

export default App;