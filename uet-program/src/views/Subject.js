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
            <table className="tabler">
              <thead>
                <tr className='trr'>
                  <th scope="col" className="thr">SubjectID</th>
                  <th scope="col" className="thr">SubjectName</th>
                  <th scope="col" className="thr">Credit</th>
                  <th scope="col" className="thr text-wrap">Prerequisite Subject</th>
                  <th scope="col" className="thr">Change</th>
                </tr>
              </thead >
              {
                subjectList.map((subject, idx) => {
                    return <tbody key={idx}>
                      <tr>
                        <td className='tdr'>{subject.subjectid}</td>
                        <td className='tdr'>{subject.subjectName}</td>
                        <td className='tdr'>{subject.credit}</td>
                        <td className='tdr'>{subject.prerequisiteSubjectId.join(', ')}</td>
                        <td className='tdr'>
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
              total={712}
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

