import './App.css';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CDBSidebarFooter, CDBBox, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer } from 'cdbreact';
import { getAccountName } from './components/AppContent';
import { getAuthToken, setAuthHeader } from './helpers/axios_helper';
import Buttons from './components/Buttons';
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
// App.js


function App() {
  let account = window.localStorage.getItem('account_name');
  const navigate = useNavigate();
  const logout = () => {
    setAuthHeader(null);
    navigate('/');
    window.location.reload();
};

  return (
    <div>
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary bgnv" bg="dark" data-bs-theme="dark">
      <Container>
      <div className="logo-and-title">
        <Image src="UET.png" className="App-logo" alt="logo" rounded width="35" />
        <Link to="/" className="navbar-brand mb-0 h1">UET PROGRAM</Link>
    </div>
        {/* {
          (getAuthToken() !== null && getAuthToken() !== "null") 
        
        } */}
        
        { getAuthToken() !== null && getAuthToken() !== "null" ?
          <>
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
              <Link to="/statistic/graduation" className="nav-link text-center">Statistic</Link>
              <Link to="/sendmail" className="nav-link text-center">Notifications</Link>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
          <NavDropdown title={account} id="basic-nav-dropdown" className="btn btn-secondary">
            <Button className="btn btn-sm btn-dark" style={{ margin: '10px' }} onClick={logout}>Log out</Button>
          </NavDropdown>

          </>
          : 
          <Navbar.Collapse className="justify-content-end">
            <Nav className="d-flex ">
              <Link to="/login" className="nav-link btn btn-primary">Sign in</Link>
            </Nav>
          </Navbar.Collapse>
        }
        
      </Container>
    </Navbar>
    <Container fluid style={{ backgroundColor: '#6ea0cc' }} className="d-flex flex-column min-vh-100 bg">
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
        <Route path="/obtaincerts/edit/:id/:id2" element={<EditCert/>} />
        <Route path="/searchid" element={<Search />} />
        <Route path="/searchSubject/:id/:id2" element={<SearchSubjects/>} />
        <Route path="/graduation/:id/:id2" element={<Graduation/>} />
        <Route path="/sendmail" element={<SendMail/>} />
        <Route path="/login" element={<AppContentWrapper />} />
        <Route path="/register" element={<AppContentWrapper />} />
        <Route path="/statistic/graduation" element={<GraduationRate />} />
      </Routes>
      </Row>
      <CDBSidebarFooter style={{ backgroundColor: '#253b80' }} className="shadow">
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
          <small className="ms-2">&copy; Group 7, 2023. Committed to Nurturing Academic Success and Lifelong Learning</small>
        </CDBBox>
        <CDBBox display="flex">
        <a href="https://www.facebook.com/UET.VNUH" target="_blank" rel="noopener noreferrer">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <CDBBtn flat color="dark" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </a>
        </CDBBox>
      </CDBBox>
    </CDBSidebarFooter>
    </Container>
    </div>
    
  );

//   let account = window.localStorage.getItem('account_name');
//   const navigate = useNavigate();
//   const logout = () => {
//     setAuthHeader(null);
//     navigate('/manager');
//     window.location.reload();
// };

//   return (
//     <div>
//     <Navbar fixed="top" expand="lg" className="bg-body-tertiary bgnv" bg="dark" data-bs-theme="dark">
//       <Container>
//       <div className="logo-and-title">
//         <Image src="UET.png" className="App-logo" alt="logo" rounded width="35" />
//         <Link to="/manager" className="navbar-brand mb-0 h1">UET PROGRAM</Link>
//     </div>
//         {/* {
//           (getAuthToken() !== null && getAuthToken() !== "null") 
        
//         } */}
        
//         { getAuthToken() !== null && getAuthToken() !== "null" ?
//           <>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Link to="/manager/students" className="nav-link">Students</Link>
//             <Link to="/manager/subjects" className="nav-link">Subjects</Link>
//             <Link to="/manager/faculties" className="nav-link">Falcuties</Link>
//             <Link to="/manager/programs" className="nav-link">Programs</Link>
//             <Link to="/manager/classrooms" className="nav-link">Classrooms</Link>
//             <NavDropdown title="Relations" id="basic-nav-dropdown">
//               <Link to="/manager/attendances" className="nav-link text-center">Attendances</Link>
//               <Link to="/manager/marksubjects" className="nav-link text-center">Marks</Link>
//               <Link to="/manager/facultyprograms/new" className="nav-link text-center">Faculty-Program</Link>
//               <Link to="/manager/programsubjects/new" className="nav-link text-center">Program-Subject</Link>
//               <Link to="/manager/obtaincerts" className="nav-link text-center">Certificate Obtained</Link>
//             </NavDropdown>
//             <NavDropdown title="More" id="basic-nav-dropdown">
//               <Link to="/manager/statistic/graduation" className="nav-link text-center">Statistic</Link>
//               <Link to="/manager/sendmail" className="nav-link text-center">Notifications</Link>
//             </NavDropdown>
//           </Nav>
//           </Navbar.Collapse>
//           <NavDropdown title={account} id="basic-nav-dropdown" className="btn btn-secondary">
//             <Button className="btn btn-sm btn-dark" style={{ margin: '10px' }} onClick={logout}>Log out</Button>
//           </NavDropdown>

//           </>
//           : 
//           <Navbar.Collapse className="justify-content-end">
//             <Nav className="d-flex ">
//               <Link to="/login" className="nav-link btn btn-primary">Sign in/Sign up</Link>
//             </Nav>
//           </Navbar.Collapse>
//         }
        
//       </Container>
//     </Navbar>
//     <Container fluid style={{ backgroundColor: '#6ea0cc' }} className="d-flex flex-column min-vh-100 bg">
//     <Row className="flex-grow-1" style={{ marginLeft: '80px', marginRight: '80px' }}>
//     <Routes>
//         <Route path="/manager/" element={<HomePage />} />
//         <Route path="/manager/students" element={<StudentPage />} />
//         <Route path="/manager/students/new" element={<AddStudent />} />
//         <Route path="/manager/subjects" element={<SubjectPage />} />
//         <Route path="/manager/subjects/new" element={<AddSubject />} />
//         <Route path="/manager/faculties" element={<Faculty />} />
//         <Route path="/manager/faculties/new" element={<AddFaculty />} />
//         <Route path="/manager/programs" element={<Program />} />
//         <Route path="/manager/programs/new" element={<AddProgram/>} />
//         <Route path="/manager/classrooms" element={<Classroom/>} />
//         <Route path="/manager/classrooms/new" element={<AddClassroom/>} />
//         <Route path="/manager/attendances" element={<Attendance/>} />
//         <Route path="/manager/attendances/new" element={<AddAttendance/>} />
//         <Route path="/manager/marksubjects" element={<Mark/>} />
//         <Route path="/manager/marksubjects/new" element={<AddMark/>} />
//         <Route path="/manager/facultyprograms/new" element={<AddFacultyProgram/>} />
//         <Route path="/manager/programsubjects/new" element={<AddProgramSubject/>} />
//         <Route path="/manager/subjects/edit/:id" element={<EditSubject />} />
//         <Route path="/manager/students/edit/:id" element={<EditStudent />} />
//         <Route path="/manager/programs/edit/:id" element={<EditProgram />} />
//         <Route path="/manager/attendances/edit/:id" element={<EditAttendance />} />
//         <Route path="/manager/marksubjects/edit/:id" element={<EditMark />} />
//         <Route path="/manager/obtaincerts" element={<Obtaincert/>} />
//         <Route path="/manager/obtaincerts/new" element={<AddCert/>} />
//         <Route path="/manager/obtaincerts/edit/:id/:id2" element={<EditCert/>} />
//         <Route path="/manager/searchid" element={<Search />} />
//         <Route path="/manager/searchSubject/:id/:id2" element={<SearchSubjects/>} />
//         <Route path="/manager/graduation/:id/:id2" element={<Graduation/>} />
//         <Route path="/manager/sendmail" element={<SendMail/>} />
//         <Route path="/manager/login" element={<AppContentWrapper />} />
//         <Route path="/manager/register" element={<AppContentWrapper />} />
//         <Route path="/manager/statistic/graduation" element={<GraduationRate />} />
//       </Routes>
//       </Row>
//       <CDBSidebarFooter style={{ backgroundColor: '#253b80' }} className="shadow">
//       <CDBBox
//         display="flex"
//         justifyContent="between"
//         alignItems="center"
//         className="mx-auto py-4 flex-wrap"
//         style={{ width: '80%' }}
//       >
//         <CDBBox display="flex" alignItems="center">
//           <a href="/" className="d-flex align-items-center p-0 text-dark">
//             <img
//               alt="logo"
//               src="db.png"
//               width="40px"
//             />
//             <span className="ms-4 h5 mb-0 font-weight-bold">UET Program</span>
//           </a>
//           <small className="ms-2">&copy; Group 7, 2023. Committed to Nurturing Academic Success and Lifelong Learning</small>
//         </CDBBox>
//         <CDBBox display="flex">
//         <a href="https://www.facebook.com/UET.VNUH" target="_blank" rel="noopener noreferrer">
//           <CDBBtn flat color="dark" className="p-2">
//             <CDBIcon fab icon="facebook-f" />
//           </CDBBtn>
//         </a>
//         <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
//           <CDBBtn flat color="dark" className="mx-3 p-2">
//             <CDBIcon fab icon="twitter" />
//           </CDBBtn>
//         </a>
//         <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//           <CDBBtn flat color="dark" className="p-2">
//             <CDBIcon fab icon="instagram" />
//           </CDBBtn>
//         </a>
//         </CDBBox>
//       </CDBBox>
//     </CDBSidebarFooter>
//     </Container>
//     </div>
    
//   );
}

export default App;
