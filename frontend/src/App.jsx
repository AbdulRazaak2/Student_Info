import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentForm from './components/StudentForm';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}
