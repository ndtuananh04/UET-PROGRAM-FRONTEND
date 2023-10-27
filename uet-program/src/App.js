import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from '../node_modules/react-bootstrap/Nav';
import Navbar from '../node_modules/react-bootstrap/Navbar';
import NavDropdown from '../node_modules/react-bootstrap/NavDropdown';
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
import AddAttendance from './views/AddAttendance';
import AddMark from './views/AddMark';
import AddFacultyProgram from './views/AddFacultyProgram';
import AddProgramSubject from './views/AddProgramSubject';
// import SubjectList from './SubjectList';
// import StudentService from './service/Service'


function App() {
  
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/" className="navbar-brand mb-0 h1">UET PROGRAM</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/students" className="nav-link">Students</Link>
            <Link to="/programs" className="nav-link">Programs</Link>
            <Link to="/faculties" className="nav-link">Falcuties</Link>
            <Link to="/programs" className="nav-link">Programs</Link>
            <Link to="/classrooms" className="nav-link">Classrooms</Link>
            <NavDropdown title="Add Relations" id="basic-nav-dropdown">
              <Link to="/attendances/new" className="nav-link text-center">Attendances</Link>
              <Link to="/marksubjects/new" className="nav-link text-center">Marks</Link>
              <Link to="/facultyprograms/new" className="nav-link text-center">Faculty-Program</Link>
              <Link to="/programsubjects/new" className="nav-link text-center">Program-Subject</Link>
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
        <Route path="/attendances/new" element={<AddAttendance/>} />
        <Route path="/marksubjects/new" element={<AddMark/>} />
        <Route path="/facultyprograms/new" element={<AddFacultyProgram/>} />
        <Route path="/programsubjects/new" element={<AddProgramSubject/>} />
      </Routes>
    </div>
    // <div className="App">

    //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
    //     <div className="container-fluid">
    //       <Link to="/" className="navbar-brand mb-0 h1">UET PROGRAM</Link>
    //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul className="navbar-nav mr-auto">
    //           <li className="nav-item">
    //             <Link to="/students" className="nav-link">Students</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/subjects" className="nav-link">Subjects</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/faculties" className="nav-link">Falcuties</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/programs" className="nav-link">Programs</Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/classrooms" className="nav-link">Classrooms</Link>
    //           </li>
    //           <li className="nav-item dropdown">
    //             <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //               Dropdown
    //             </a>
    //             <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
    //               <li><a className="dropdown-item" href="#">Action</a></li>
    //               <li><a className="dropdown-item" href="#">Another action</a></li>
    //               <li><a className="dropdown-item" href="#">Something else here</a></li>
    //             </ul>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/students" element={<StudentPage />} />
    //     <Route path="/students/new" element={<AddStudent />} />
    //     <Route path="/subjects" element={<SubjectPage />} />
    //     <Route path="/subjects/new" element={<AddSubject />} />
    //     <Route path="/faculties" element={<Faculty />} />
    //     <Route path="/faculties/new" element={<AddFaculty />} />
    //     <Route path="/programs" element={<Program />} />
    //     <Route path="/programs/new" element={<AddProgram/>} />
    //     <Route path="/classrooms" element={<Classroom/>} />
    //     <Route path="/classrooms/new" element={<AddClassroom/>} />
    //   </Routes>

    // </div>
  );
}

export default App;
