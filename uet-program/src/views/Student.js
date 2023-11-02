import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/students'

export default function Student() {
    const [studentList, setStudentList] = useState([]);
    const getStudents = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setStudentList(response.data)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='container'>
            {
              studentList.length < 1 ? getStudents() : ''
            }
            <br></br>
            <h1 className="text-center">Student page</h1>
            <button className="btn btn-secondary" onClick={getStudents}>Get Students</button>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">StudentID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              {
                studentList.length >= 1 ? studentList.map((student, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{student.studentId}</th>
                              <td>{student.name}</td>
                              <td>{student.age}</td>
                              <td>{student.gender}</td>
                              <td>{student.address}</td>
                              <td>{student.phone}</td>
                            </tr>
                            </tbody>
                })
                : ''
                }
            </table>
            <Link to="/students/new"><button className="btn btn-primary">Add Student</button></Link>
        </div>
    )
}