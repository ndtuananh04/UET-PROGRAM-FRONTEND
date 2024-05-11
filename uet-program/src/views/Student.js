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
                setAuthHeader(null);
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
            <table className="tabler " >
              <thead>
                <tr className='table-primary nth-child trr'>
                  <th scope="col" className="thr">StudentID</th>
                  <th scope="col" className="thr">Name</th>
                  <th scope="col" className="thr">Date of Birth</th>
                  <th scope="col" className="thr">Gender</th>
                  <th scope="col" className="thr">Address</th>
                  <th scope="col" className="thr">Phone</th>
                  <th scope="col" className="thr">Class</th>
                  <th scope="col" className="thr">Change</th>
                </tr>
              </thead>
              {
                studentList.map((student, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <td className='tdr'>{student.studentId}</td>
                              <td className='tdr'>{student.name}</td>
                              <td className='tdr'>{student.dateOfBirth}</td>
                              <td className='tdr'>{student.gender}</td>
                              <td className='tdr'>{student.address}</td>
                              <td className='tdr'>{student.phone}</td>
                              <td className='tdr'>{student.classFullName}</td>
                              <td className='tdr'>
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
              total={7467}
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