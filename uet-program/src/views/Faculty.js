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
            <table className="tabler">
              <thead>
                <tr className='table-primary trr'>
                  <th scope="col" className='thr'>Faculty Name</th>
                  <th scope="col" className='thr'>Address</th>
                  <th scope="col" className='thr'>Email</th>
                  <th scope="col" className='thr'>Phone</th>
                  <th scope="col" className='thr'>Website</th>
                </tr>
              </thead>
              {
                facultyList.map((faculty, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <td className='tdr'>{faculty.facultyName}</td>
                              <td className='tdr'>{faculty.address}</td>
                              <td className='tdr'>{faculty.email}</td>
                              <td className='tdr'>{faculty.phone}</td>
                              <td className='tdr'>{faculty.website}</td>
                            </tr>
                            </tbody>
                })
                }
            </table>
            <Link to="/faculties/new"><button className="btn btn-primary">Add Faculties</button></Link>
        </div>
    )
}