import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default function Faculty() {
  const [count, setCount] = useState(0);  
  const [facultyList, setFacultyList] = useState([]);
    
  useEffect(() => {
      request(
        "GET",
        'faculties',
        {}).then(
        (response) => {
          console.log(response.data)
          setFacultyList(response.data)
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

    return (
        <div className='container pt-5'>
            <br></br>
            <h1 className="text-center">Faculty page</h1>
            <table className="table table-hover table-bordered table-info">
              <thead>
                <tr className='table-primary'>
                  <th scope="col">Faculty Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th>
                </tr>
              </thead>
              {
                facultyList.map((faculty, idx) => {
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
                }
            </table>
            <Link to="/faculties/new"><button className="btn btn-primary">Add Faculties</button></Link>
        </div>
    )
}