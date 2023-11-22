import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import * as XLSX from "xlsx";import { request, setAuthHeader } from '../helpers/axios_helper';

const URL = 'http://localhost:8080/myprogram/marksubjects'

export default function Mark() {
  const [count,setCount] = useState(0);  
  const [markList, setMarkList] = useState([]);
  
  useEffect(() => {
    request(
      "GET",
      'marksubjects',
      {}).then(
      (response) => {
        console.log(response.data)
        setMarkList(response.data)
      }).catch(
      (error) => {
          if (error.response.status === 401) {
              setAuthHeader(null);
          } else {
              this.setState({data: error.response.code})
          }
      }
  );
  },[count])
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
        console.log(markList)
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(markList);

        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

        XLSX.writeFile(wb, "Marks.xlsx");
      }

    return (
        <div className='container pt-5'>
            <div class="row">
              <div class="col text-right pt-3">
              <button type="button" class="btn btn-primary" onClick={handleExport}>Export</button>
            </div>
            </div>
            
            <br></br>
            <h1 className="text-center">Mark page</h1>
            
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Student ID</th>
                  <th scope="col">Subject ID</th>
                  <th scope="col">Mark</th>
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
                                <Link className='btn btn-sm' to={`/marksubjects/edit/${mark.studentId}&${mark.subjectId}`}>Edit</Link>
                                <button onClick={e =>deleteMark(mark.studentId, mark.subjectId, e)} className='btn btn-sm'>Delete</button>
                              </td>
                            </tr>
                            </tbody>
                })
                : ''
                }
            </table>
            <Link to="/marksubjects/new"><button className="btn btn-primary">Add Mark</button></Link>
        </div>
    )
}

