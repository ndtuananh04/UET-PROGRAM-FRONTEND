import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/subjects'

export default function Subject() {
    const [subjectList, setSubjectList] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
      axios.get(URL)
            .then(response => {
            console.log(response.data)
            setSubjectList(response.data)
            })
            .catch(error => console.log(error));
    },[count])
    const deleteSubject = (id, e) => {
      e.preventDefault();
      axios.delete(`http://localhost:8080/myprogram/subjects/delete/${id}`)
      .then(response => {
        console.log('Delete', response)
        setCount(count+1)
      })
      .catch(err => console.log(err));
    }

    const groupedSubjects = {};
    subjectList.forEach(subject => {
      if (!groupedSubjects[subject.roleType]) {
        groupedSubjects[subject.roleType] = [];
      }
      groupedSubjects[subject.roleType].push(subject);
    });

    return (
        <div className='container'>
            <br></br>
            <h1 className="text-center">Subject page</h1>
            <Link to="/searchSubject"><button className="btn btn-primary">Search Subjects</button></Link>
            {Object.keys(groupedSubjects).map(roleType => (
            <div key={roleType}>
            <h2>{roleType}</h2>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SubjectID</th>
                  <th scope="col">SubjectName</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Prerequisite Subject</th>
                  <th scope="col">Change</th>
                </tr>
              </thead >
              <tbody>
              {groupedSubjects[roleType].map((subject, idx) => (
                <tr key={idx}>
                  <th scope="row">{subject.subjectid}</th>
                  <td>{subject.subjectName}</td>
                  <td>{subject.credit}</td>
                  <td>{subject.prerequisiteSubjectId}</td>
                  <td>
                    <Link className='btn btn-sm' to={`/subjects/edit/${subject.subjectid}`}>Edit</Link>
                    <button onClick={e => deleteSubject(subject.subjectid, e)} className='btn btn-sm'>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
            ))}
            <Link to="/subjects/new"><button className="btn btn-primary">Add Subject</button></Link>
        </div>
    )
}

