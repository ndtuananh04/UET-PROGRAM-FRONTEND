import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import { PaginationControl } from 'react-bootstrap-pagination-control';

export default function Student() {
  const [studentList, setStudentList] = useState([]);
  const [page, setPage] = useState(1);

    useEffect(() => {
      request(
        "GET",
          `students?page=${page}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setStudentList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
    );
    },[page])
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
            <br></br><br></br>
            <table className="table table-hover table-bordered table-info" >
              <thead>
                <tr className='table-primary'>
                  <th scope="col">StudentID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Class</th>
                  <th scope="col">Change</th>
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
                                <Link className='btn btn-sm btn-outline-info' to={`/students/edit/${student.studentId}`}>Edit</Link>
                                <button onClick={e =>deleteStudent(student.studentId, e)} className='btn btn-sm btn-outline-danger'>Delete</button>
                              </td>
                            </tr>
                            </tbody>
                })
              }
            </table>
            <Link to="/students/new"><button className="btn btn-primary">Add Student</button></Link><br></br>
            <PaginationControl
              page={page}
              between={4}
              total={6223}
              limit={20}
              changePage={(page) => {
                setPage(page); 
                console.log(page)
              }}
              ellipsis={1}
            />          
        </div>
    )
}