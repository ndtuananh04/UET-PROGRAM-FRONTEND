import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/classrooms'

export default function Classroom() {
    const [classroomList, setClassroomList] = useState([]);
    const getClassrooms = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setClassroomList(response.data)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='container'>
            {
              classroomList.length < 1 ? getClassrooms() : ''
            }
            <br></br>
            <h1 className="text-center">Classroom page</h1>
            <button onClick={getClassrooms}>Get Classrooms</button>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Cohort</th>
                  <th scope="col">Class Name</th>
                </tr>
              </thead>
              {
                classroomList.length >= 1 ? classroomList.map((classroom, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{classroom.cohort}</th>
                              <td>{classroom.nameClass}</td>
                            </tr>
                            </tbody>
                })
                : ''
                }
            </table>
            <Link to="/classrooms/new">Add Classroom</Link>
        </div>
    )
}

