import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './views/Home';
import StudentPage from './views/Student';
import AddStudent from './views/AddStudent';
import SubjectPage from './views/Subject';
import AddSubject from './views/AddSubject';
import Faculty from './views/Faculty';
import AddFaculty from './views/AddFaculty';
import Program from './views/Program';
import AddProgram from './views/AddProgram';
import Classroom from './views/Classroom';
import AddClassroom from './views/AddClassroom';
// import SubjectList from './SubjectList';
// import StudentService from './service/Service'


function App() {
  
  return (

    <div className="App">

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand mb-0 h1">UET PROGRAM</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/students" className="nav-link">Students</Link>
              </li>
              <li className="nav-item">
                <Link to="/subjects" className="nav-link">Subjects</Link>
              </li>
              <li className="nav-item">
                <Link to="/faculties" className="nav-link">Falcuties</Link>
              </li>
              <li className="nav-item">
                <Link to="/programs" className="nav-link">Programs</Link>
              </li>
              <li className="nav-item">
                <Link to="/classrooms" className="nav-link">Classrooms</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/new" element={<AddStudent />} />
        <Route path="/subjects" element={<SubjectPage />} />
        <Route path="/subjects/new" element={<AddSubject />} />
        <Route path="/faculties" element={<Faculty />} />
        <Route path="/faculties/new" element={<AddFaculty />} />
        <Route path="/programs" element={<Program />} />
        <Route path="/programs/new" element={<AddProgram/>} />
        <Route path="/classrooms" element={<Classroom/>} />
        <Route path="/classrooms/new" element={<AddClassroom/>} />
      </Routes>

    </div>
  );
}

export default App;
