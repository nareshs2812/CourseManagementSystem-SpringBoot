import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import CourseListingPage from './components/CourseListingPage';
import MyCourses from './components/MyCourses';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/header" element={<Header />} />
        <Route path="/courses" element={<CourseListingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/mycourses" element={<MyCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
