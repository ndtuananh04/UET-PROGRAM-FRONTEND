import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';


export default function Subject() {
    const [subjectList, setSubjectList] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
      request(
        "GET",
        'subjects',
        {}).then(
        (response) => {
          console.log(response.data)
          setSubjectList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
    },[count])
    const deleteSubject = (id, e) => {
      e.preventDefault();
      request(
        "DELETE",
        `subjects/subjects/delete/${id}`,
        {}).then(
        (response) => {
          console.log("deleted")
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
            <h1 className="text-center">Subject page</h1>
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
              {
                subjectList.map((subject, idx) => {
                    return <tbody key={idx}>
                      <tr>
                        <th scope="row">{subject.subjectid}</th>
                        <td>{subject.subjectName}</td>
                        <td>{subject.credit}</td>
                        <td>{subject.prerequisiteSubjectId.join(',')}</td>
                        <td>
                        <Link className='btn btn-sm' to={`/subjects/edit/${subject.subjectid}`}>Edit</Link>
                        <button onClick={e => deleteSubject(subject.subjectid, e)} className='btn btn-sm'>Delete</button>
                        </td>
                      </tr>
                    </tbody>
                })
              }
            </table>
            <Link to="/subjects/new"><button className="btn btn-primary">Add Subject</button></Link>
        </div>
    )
}

