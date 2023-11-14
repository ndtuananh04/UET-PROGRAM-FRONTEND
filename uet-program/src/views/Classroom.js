import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/classrooms'

export default function Classroom() {
  const [count,setCount] = useState(0);  
  const [classroomList, setClassroomList] = useState([]);
    useEffect(() => {
      axios.get(URL)
            .then(response => {
            console.log(response.data)
            setClassroomList(response.data)
            })
            .catch(error => console.log(error));
    },[count])
    return (
        <div className='container'>
            <br></br>
            <h1 className="text-center">Classroom page</h1>
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
            <Link to="/classrooms/new"><button className="btn btn-primary">Add Classroom</button></Link>
        </div>
    )
}

