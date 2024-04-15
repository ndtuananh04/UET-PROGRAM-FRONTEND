import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import {baseURL} from '../constant/config';

const URL = baseURL()  + '/obtaincerts'

export default function Obtaincert() {
  const [certList, setCertList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    request(
      "GET",
      `obtaincerts?page=${page}`,
      {}).then(
      (response) => {
        console.log(response.data)
        setCertList(response.data)
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
    
    const deleteCert = (id, id2, e) => {
      e.preventDefault();
      // axios.delete(`http://localhost:8080/myprogram/obtaincerts/delete/${id}&${id2}`)
      // .then(response => {
      //   console.log('Delete', response)
      //   setCount(count+1)
      // })
      // .catch(err => console.log(err));
      request(
        "DELETE",
        `obtaincerts/delete/${id}&${id2}`,
        {}).then(
        (response) => {
          console.log(response.data)
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
            <h1 className="text-center">Certificate page</h1>
            <table className="table table-hover table-bordered table-info">
              <thead>
                <tr className='table-primary'>
                  <th scope="col">StudentID</th>
                  <th scope="col">Certificate Type</th>
                  <th scope="col">Level</th>
                  <th scope="col">Submission Date</th>
                  <th scope="col">Change</th>
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
                              <td>
                                <Link className='btn btn-sm btn-outline-info' to={`/obtaincerts/edit/${cert.studentId}/${cert.certificateType}`}>Edit</Link>
                                <button onClick={e =>deleteCert(cert.studentId, cert.certificateType, e)} className='btn btn-sm btn-outline-danger'>Delete</button>
                              </td>
                            </tr>
                            </tbody>
                })
                }
            </table>
            <Link to="/obtaincerts/new"><button className="btn btn-primary">Add Certificate</button></Link><br></br>
            <PaginationControl
              page={page}
              between={4}
              total={674}
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