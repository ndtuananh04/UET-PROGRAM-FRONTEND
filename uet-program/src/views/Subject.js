import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/subjects'

export default function Subject() {
    const [subjectList, setSubjectList] = useState([]);
    const getSubjects = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setSubjectList(response.data)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='container'>
            {
              subjectList.length < 1 ? getSubjects() : ''
            }
            <br></br>
            <h1 className="text-center">Subject page</h1>
            <button className="btn btn-secondary" onClick={getSubjects}>Get Subjects</button>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SubjectID</th>
                  <th scope="col">SubjectName</th>
                  <th scope="col">Credit</th>
                  <th scope="col">RoleType</th>
                  <th scope="col">Prerequisite Subject</th>
                  <th scope="col">Change</th>
                </tr>
              </thead >
              {
                   subjectList.length >=1 ? subjectList.map((subject, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{subject.subjectid}</th>
                              <td>{subject.subjectName}</td>
                              <td>{subject.credit}</td>
                              <td>{subject.roleType}</td>
                              <td>{subject.prerequisiteSubjectId}</td>
                              <Link className='btn btn-sm' to={`/subjects/edit/${subject.subjectid}`}>Edit</Link>
                            </tr>
                            </tbody>
                })
                : ''
                }

            </table>
            <Link to="/subjects/new"><button className="btn btn-primary">Add Subject</button></Link>
        </div>
    )
}

