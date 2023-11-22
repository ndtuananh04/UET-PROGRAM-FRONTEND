import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';

const URL = 'students'

export default function Student() {
  const [count, setCount] = useState(0);
  const [studentList, setStudentList] = useState([]);

    useEffect(() => {
      request(
        "GET",
          URL,
        {}).then(
        (response) => {
          console.log(response.data)
          setStudentList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
    );
    },[count])
    const deleteStudent = (id, e) => {
      e.preventDefault();
      // axios.delete(`http://localhost:8080/myprogram/students/delete/${id}`)
      // .then(response => {
      //   console.log('Delete', response)
      //   setCount(count+1)
      // })
      // .catch(err => console.log(err));
      request(
        "DELETE",
        `students/delete/${id}`,
        {}).then(
        (response) => {
          console.log(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
    }

    return (
        <div className='container pt-5'>
            <br></br>
            <h1 className="text-center">Student page</h1>
            <Link to="/searchid"><button className="btn btn-primary">Search Student</button></Link>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">StudentID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Class</th>
                </tr>
              </thead>
              {
                studentList.map((student, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{student.studentId}</th>
                              <td>{student.name}</td>
                              <td>{student.dateOfBirth}</td>
                              <td>{student.gender}</td>
                              <td>{student.address}</td>
                              <td>{student.phone}</td>
                              <td>{student.classFullName}</td>
                              <td>
                                <Link className='btn btn-sm' to={`/students/edit/${student.studentId}`}>Edit</Link>
                                <button onClick={e =>deleteStudent(student.studentId, e)} className='btn btn-sm'>Delete</button>
                              </td>
                            </tr>
                            </tbody>
                })
              }
            </table>
            <Link to="/students/new"><button className="btn btn-primary">Add Student</button></Link><br></br>
        </div>
    )
}