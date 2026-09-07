import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserHome from './Users/UserHome'
import Navbar from './Users/Navbar'
import Login from './Components/Login'
import UserCourses from './Users/UserCourses'
import CourseGrades from './Users/UserGrades'
import AdminHome from './Admin/AdminHome'
import AdminCourses from './Admin/AdminCourses'
import AdminGrades from './Admin/AdminGrades'
import AdminAddGrade from './Admin/AdminAddGrades'
import AdminAddCourse from './Admin/AdminAddCourse'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/courses" element={<UserCourses />} />
        <Route path="/courses/:slug" element={<CourseGrades />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/add" element={<AdminAddCourse />} />
        <Route path="/admin/courses/:slug/grades" element={<AdminGrades />} />
        <Route path="/admin/courses/:slug/grades/add" element={<AdminAddGrade />} />
      </Routes>
    </div>
  )
}

export default App