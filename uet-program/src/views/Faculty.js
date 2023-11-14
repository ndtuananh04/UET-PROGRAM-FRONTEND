import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/faculties'

export default function Faculty() {
  const [count, setCount] = useState(0);  
  const [facultyList, setFacultyList] = useState([]);
    useEffect(() => {
      axios.get(URL)
            .then(response => {
            console.log(response.data)
            setFacultyList(response.data)
            })
            .catch(error => console.log(error));
    },[count])
    return (
        <div className='container'>
            <br></br>
            <h1 className="text-center">Faculty page</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Faculty Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th>
                </tr>
              </thead>
              {
                facultyList.length >= 1 ? facultyList.map((faculty, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{faculty.facultyName}</th>
                              <td>{faculty.address}</td>
                              <td>{faculty.email}</td>
                              <td>{faculty.phone}</td>
                              <td>{faculty.website}</td>
                            </tr>
                            </tbody>
                })
                : ''
                }
            </table>
            <Link to="/faculties/new"><button className="btn btn-primary">Add Faculties</button></Link>
        </div>
    )
}