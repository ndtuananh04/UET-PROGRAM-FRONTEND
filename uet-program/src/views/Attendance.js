import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default function Attendance() {
  const [count,setCount] = useState(0);  
  const [attendanceList, setAttendanceList] = useState([]);
  useEffect(() => {
    request(
      "GET",
      'attendances',
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
  },[count])

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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Student ID</th>
                  <th scope="col">Program</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date </th>
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
                              <Link className='btn btn-sm' to={`/attendances/edit/${attendance.studentId}&${attendance.programFullCode}`}>Edit</Link>
                              <button onClick={e =>deleteAttendance(attendance.studentId,attendance.programFullCode, e)} className='btn btn-sm'>Delete</button>
                            </tr>
                            </tbody>
                })
                : ''
                }
            </table>
            <Link to="/attendances/new"><button className="btn btn-primary">Add Attendance</button></Link>
        </div>
    )
}

