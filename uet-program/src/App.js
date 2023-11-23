import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CDBSidebarFooter, CDBBox, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer } from 'cdbreact';
import Nav from '../node_modules/react-bootstrap/Nav';
import Navbar from '../node_modules/react-bootstrap/Navbar';
import NavDropdown from '../node_modules/react-bootstrap/NavDropdown';
import Image from '../node_modules/react-bootstrap/Image';
import HomePage from './views/Home';
import StudentPage from './views/Student';
import AddStudent from './views/AddStudent';
import EditStudent from './views/EditStudent';
import SubjectPage from './views/Subject';
import AddSubject from './views/AddSubject';
import EditSubject from './views/EditSubject';
import Faculty from './views/Faculty';
import AddFaculty from './views/AddFaculty';
import Program from './views/Program';
import AddProgram from './views/AddProgram';
import EditProgram from './views/EditProgram';
import Classroom from './views/Classroom';
import AddClassroom from './views/AddClassroom';
import Attendance from './views/Attendance';
import AddAttendance from './views/AddAttendance';
import EditAttendance from './views/EditAttendance';
import Mark from './views/Marks';
import AddMark from './views/AddMark';
import EditMark from './views/EditMark';
import AddFacultyProgram from './views/AddFacultyProgram';
import AddProgramSubject from './views/AddProgramSubject';
import Obtaincert from './views/Obtaincert';
import AddCert from './views/AddCert';
import EditCert from './views/EditCert';
import Search from './views/Search';
import SearchSubjects from './views/SearchSubjects';
import Graduation from './views/Graduation';
import SendMail from './views/SendMail';
import Header from './components/Header';
import AppContentWrapper from './components/AppContentWrapper';
import GraduationRate from './views/GraduationRate';


// import SubjectList from './SubjectList';
// import StudentService from './service/Service'


function App() {
  return (
    <div>
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Image src="UET.png" className="App-logo" alt="logo" rounded width="35" />
        <Link to="/" className="navbar-brand mb-0 h1">UET PROGRAM</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/students" className="nav-link">Students</Link>
            <Link to="/subjects" className="nav-link">Subjects</Link>
            <Link to="/faculties" className="nav-link">Falcuties</Link>
            <Link to="/programs" className="nav-link">Programs</Link>
            <Link to="/classrooms" className="nav-link">Classrooms</Link>
            <NavDropdown title="Relations" id="basic-nav-dropdown">
              <Link to="/attendances" className="nav-link text-center">Attendances</Link>
              <Link to="/marksubjects" className="nav-link text-center">Marks</Link>
              <Link to="/facultyprograms/new" className="nav-link text-center">Faculty-Program</Link>
              <Link to="/programsubjects/new" className="nav-link text-center">Program-Subject</Link>
              <Link to="/obtaincerts" className="nav-link text-center">Certificate Obtained</Link>
            </NavDropdown>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <Link to="/statistic/graduation" className="nav-link">Statistic</Link>
              <Link to="/sendmail" className="nav-link">Notifications</Link>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav className="d-flex">
          <Link to="/login" className="nav-link">Sign in/Sign up</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container fluid style={{ backgroundColor: '#6ea0cc' }} className="d-flex flex-column min-vh-100">
    <Row className="flex-grow-1" style={{ marginLeft: '80px', marginRight: '80px' }}>
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
        <Route path="/attendances" element={<Attendance/>} />
        <Route path="/attendances/new" element={<AddAttendance/>} />
        <Route path="/marksubjects" element={<Mark/>} />
        <Route path="/marksubjects/new" element={<AddMark/>} />
        <Route path="/facultyprograms/new" element={<AddFacultyProgram/>} />
        <Route path="/programsubjects/new" element={<AddProgramSubject/>} />
        <Route path="/subjects/edit/:id" element={<EditSubject />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/programs/edit/:id" element={<EditProgram />} />
        <Route path="/attendances/edit/:id" element={<EditAttendance />} />
        <Route path="/marksubjects/edit/:id" element={<EditMark />} />
        <Route path="/obtaincerts" element={<Obtaincert/>} />
        <Route path="/obtaincerts/new" element={<AddCert/>} />
        <Route path="/obtaincerts/edit/:id" element={<EditCert/>} />
        <Route path="/searchid" element={<Search />} />
        <Route path="/searchSubject/:id/:id2" element={<SearchSubjects/>} />
        <Route path="/graduation/:id/:id2" element={<Graduation/>} />
        <Route path="/sendmail" element={<SendMail/>} />
        <Route path="/login" element={<AppContentWrapper />} />
        <Route path="/register" element={<AppContentWrapper />} />
        <Route path="/statistic/graduation" element={<GraduationRate />} />
      </Routes>
      </Row>
      <CDBSidebarFooter style={{ backgroundColor: '#5278a3' }} className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <img
              alt="logo"
              src="db.png"
              width="40px"
            />
            <span className="ms-4 h5 mb-0 font-weight-bold">UET Program</span>
          </a>
          <small className="ms-2">&copy; Group 7, 2023. Everything to help you graduate on time</small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBSidebarFooter>
    </Container>
    </div>
    
  );
}

export default App;
