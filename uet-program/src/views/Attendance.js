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
            <table className="tabler">
              <thead>
                <tr className='table-primary trr'>
                  <th className='thr'>Student ID</th>
                  <th className='thr'>Program</th>
                  <th className='thr'>Start Date</th>
                  <th className='thr'>End Date </th>
                  <th className='thr'>Change</th>
                </tr>
              </thead>
              {
                attendanceList.length >= 1 ? attendanceList.map((attendance, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <td className='tdr'>{attendance.studentId}</td>
                              <td className='tdr'>{attendance.programFullCode}</td>
                              <td className='tdr'>{attendance.startDate}</td>
                              <td className='tdr'>{attendance.endDate}</td>
                              <td className='tdr'>
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

