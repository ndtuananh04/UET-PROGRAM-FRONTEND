import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/attendances'

export default function Attendance() {
    const [attendanceList, setAttendanceList] = useState([]);
    const getAttendances = (e) => {
        e.preventDefault()
    
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setAttendanceList(response.data)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='container'>
            <h1>Addttendance page</h1>
            <button className="btn btn-secondary" onClick={getAttendances}>Get Attendances</button>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">attendanceID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              {
                attendanceList.length >= 1 ? attendanceList.map((attendance, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{attendance.attendanceId}</th>
                              <td>{attendance.name}</td>
                              <td>{attendance.age}</td>
                              <td>{attendance.gender}</td>
                              <td>{attendance.address}</td>
                              <td>{attendance.phone}</td>
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