import axios from 'axios';
import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';


export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [student, setStudent] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios.get(`http://localhost:8080/myprogram/searchid/${searchTerm}`)
    //         .then(response => {
    //         console.log(response.data)
    //         setStudent(response.data)
    //         })
    //         .catch(error => console.log(error));
    request(
        "GET",
        `searchid/${searchTerm}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setStudent(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
  };

  return (
    <div className="container pt-5">
      <br></br>
      <form onSubmit={handleSubmit}> 
          <div className='form-group'>
            <label>Student ID:</label>
            <input type="text" value={searchTerm} placeholder="Search" className="form-control" onChange={handleChange} ></input><br></br>
          </div>
        <button type="submit" className='btn btn-primary'>Search</button>
        </form>
        <br></br>
      {student === '' ? '' : 
        <table className="table table-hover table-bordered table-info">
        <thead>
          <tr className='table-primary'>
            <th scope="col">StudentID</th>
            <th scope="col">Name</th>
            <th scope="col">Date Of Birth</th>
            <th scope="col">Gender</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Class</th>
            <th scope="col">Program</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
           <tbody>
              <tr>
                <th scope="row">{student.studentId}</th>
                <td>{student.name}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.gender}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>{student.classFullName}</td>
                <td>{student.programFullCode}</td>
                <td>
                <Link className='btn btn-sm btn-outline-info' to={`/searchSubject/${student.studentId}/${student.programFullCode}`}>Info</Link>
                <Link className='btn btn-sm btn-outline-info' to={`/graduation/${student.studentId}/${student.programFullCode}`}>Grad Status</Link>
                </td>
              </tr>
            </tbody>
      </table>
      }
      
    </div>
  )
}


