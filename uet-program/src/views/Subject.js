import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import { PaginationControl } from 'react-bootstrap-pagination-control';

export default function Subject() {
    const [subjectList, setSubjectList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
      request(
        "GET",
        `subjects?page=${page}`,
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
    },[page])
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
            <table className="table table-hover table-bordered table-info">
              <thead>
                <tr className='table-primary'>
                  <th scope="col">SubjectID</th>
                  <th scope="col">SubjectName</th>
                  <th scope="col">Credit</th>
                  <th scope="col" className="text-wrap">Prerequisite Subject</th>
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
                        <td className="text-wrap">{subject.prerequisiteSubjectId.join(', ')}</td>
                        <td>
                        <Link className='btn btn-sm btn-outline-info' to={`/subjects/edit/${subject.subjectid}`}>Edit</Link>
                        <button onClick={e => deleteSubject(subject.subjectid, e)} className='btn btn-outline-danger btn-sm'>Delete</button>
                        </td>
                      </tr>
                    </tbody>
                })
              }
            </table>
            <Link to="/subjects/new"><button className="btn btn-primary">Add Subject</button></Link>
            <PaginationControl
              page={page}
              between={4}
              total={250}
              limit={20}
              changePage={(page) => {
                setPage(page); 
                console.log(page)
              }}
              ellipsis={1}
            />          
        </div>
    )
}

