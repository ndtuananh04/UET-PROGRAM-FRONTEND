import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import { PaginationControl } from 'react-bootstrap-pagination-control';

export default function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    request(
      "GET",
      `attendances?page=${page}`,
      {}).then(
      (response) => {
        console.log(response.data)
        setAttendanceList(response.data)
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

    const deleteAttendance = (id, id2, e) => {
        e.preventDefault();
        // axios.delete(`http://localhost:8080/myprogram/attendances/delete/${id}&${id2}`)
        // .then(response => {
        //   console.log('Delete', response)
        //   setCount(count+1)
        // })
        // .catch(err => console.log(err));
        request(
          "DELETE",
          `attendances/delete/${id}&${id2}`,
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
            <h1 className="text-center">Attendance page</h1>
            <table className="table table-hover table-bordered table-info">
              <thead>
                <tr className='table-primary'>
                  <th scope="col">Student ID</th>
                  <th scope="col">Program</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date </th>
                  <th scope="col">Change</th>
                </tr>
              </thead>
              {
                attendanceList.length >= 1 ? attendanceList.map((attendance, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{attendance.studentId}</th>
                              <td>{attendance.programFullCode}</td>
                              <td>{attendance.startDate}</td>
                              <td>{attendance.endDate}</td>
                              <td>
                                <Link className='btn btn-sm btn-outline-info' to={`/attendances/edit/${attendance.studentId}&${attendance.programFullCode}`}>Edit</Link>
                                <button onClick={e =>deleteAttendance(attendance.studentId,attendance.programFullCode, e)} className='btn btn-sm btn-outline-danger'>Delete</button>
                              </td>
                            </tr>
                            </tbody>
                })
                : ''
                }
            </table>
            <Link to="/attendances/new"><button className="btn btn-primary">Add Attendance</button></Link>
            <PaginationControl
              page={page}
              between={4}
              total={7226}
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

