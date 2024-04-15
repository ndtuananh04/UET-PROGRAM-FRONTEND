import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { request, setAuthHeader } from '../helpers/axios_helper';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import {baseURL} from '../constant/config';

const URL = baseURL() + '/marksubjects'

export default function Mark() {
  const [markList, setMarkList] = useState([]);
  const [page, setPage] = useState(1);
  const [exportInfo, setExportInfo] = useState([]);
  
  useEffect(() => {
    request(
      "GET",
      `marksubjects?page=${page}`,
      {}).then(
      (response) => {
        console.log(response.data)
        const extractedData = response.data.map(item => ({
          StudentId: item.studentId,
          SubjectId: item.subjectId,
          Mark: item.mark
        }));
        setExportInfo(extractedData)
        setMarkList(response.data)
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
    const deleteMark = (id, id2, e) => {
        e.preventDefault();
        // axios.delete(`http://localhost:8080/myprogram/marksubjects/delete/${id}&${id2}`)
        // .then(response => {
        //   console.log('Delete', response)
        //   setCount(count+1)
        // })
        // .catch(err => console.log(err));
        request(
          "DELETE",
          `marksubjects/delete/${id}&${id2}`,
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

      const handleExport = () => {
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(exportInfo);

        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

        XLSX.writeFile(wb, "Marks.xlsx");
      }

    return (
        <div className='container pt-5'>
            <div class="row">
              <div class="col text-right pt-3">
              <button type="button" class="btn btn-primary" onClick={handleExport} style={{ float: 'right' }}>Export</button>
            </div>
            </div>
            <h1 className="text-center">Mark page</h1>
            
            <table className="table table-hover table-bordered table-info">
              <thead>
                <tr className='table-primary'>
                  <th scope="col">Student ID</th>
                  <th scope="col">Subject ID</th>
                  <th scope="col">Mark</th>
                  <th scope="col">Change</th>
                </tr>
              </thead>
              {
                markList.length >= 1 ? markList.map((mark, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <th scope="row">{mark.studentId}</th>
                              <td>{mark.subjectId}</td>
                              <td>{mark.mark}</td>
                              <td>
                                <Link className='btn btn-sm btn-outline-info' to={`/marksubjects/edit/${mark.studentId}&${mark.subjectId}`}>Edit</Link>
                                <button onClick={e =>deleteMark(mark.studentId, mark.subjectId, e)} className='btn btn-sm btn-outline-danger'>Delete</button>
                              </td>
                            </tr>
                            </tbody>
                })
                : ''
                }
            </table>
            <Link to="/marksubjects/new"><button className="btn btn-primary">Add Mark</button></Link>
            <PaginationControl
              page={page}
              between={4}
              total={373233}
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

