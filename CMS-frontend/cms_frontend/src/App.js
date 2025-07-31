import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import CourseListingPage from './components/CourseListingPage';
import MyCourses from './components/MyCourses';
import AdminHome from './components/AdminHome';     
import AdminHeader from './components/AdminHeader';
import AdminCourse from './components/AdminCourse';
import AddCourse from './components/AddCourse';
import MyProfile from './components/MyProfileAdmin';
import CourseDetails from './components/CourseDetails';
import ContactPage from './components/ContactPage';
import Profile from './components/Profile';


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
        <Route path="/adminheader" element={<AdminHeader />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/admincourse" element={<AdminCourse />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/profileAdmin" element={<MyProfile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
