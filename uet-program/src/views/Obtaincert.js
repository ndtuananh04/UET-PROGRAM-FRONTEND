import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/obtaincerts'

export default function Obtaincert() {
  const [count, setCount] = useState(0);
  const [certList, setCertList] = useState([]);
    useEffect(() => {
      axios.get(URL)
      .then(response => {
      console.log(response.data)
      setCertList(response.data)
      })
      .catch(error => console.log(error));
    },[count])
    
    const deleteCert = (id, id2, e) => {
      e.preventDefault();
      axios.delete(`http://localhost:8080/myprogram/obtaincerts/delete/${id}&${id2}`)
      .then(response => {
        console.log('Delete', response)
        setCount(count+1)
      })
      .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <br></br>
            <h1 className="text-center">Certificate page</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">StudentID</th>
                  <th scope="col">Certificate Type</th>
                  <th scope="col">Level</th>
                  <th scope="col">Submission Date</th>
                </tr>
              </thead>
              {
                certList.map((cert, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{cert.studentId}</th>
                              <td>{cert.certificateType}</td>
                              <td>{cert.levelLanguage}</td>
                              <td>{cert.submissionDate}</td>
                              <Link className='btn btn-sm' to={`/obtaincerts/edit/${cert.studentId}&${cert.certificateType}`}>Edit</Link>
                              <button onClick={e =>deleteCert(cert.studentId, cert.certificateType, e)} className='btn btn-sm'>Delete</button>
                            </tr>
                            </tbody>
                })
                }
            </table>
            <Link to="/obtaincerts/new"><button className="btn btn-primary">Add Certificate</button></Link><br></br>
        </div>
    )
}