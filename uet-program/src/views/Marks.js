import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/marksubjects'

export default function Mark() {
  const [count,setCount] = useState(0);  
  const [markList, setMarkList] = useState([]);
    useEffect(() => {
      axios.get(URL)
            .then(response => {
            console.log(response.data)
            setMarkList(response.data)
            })
            .catch(error => console.log(error));
    },[count])

    const deleteMark = (id, id2, e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/myprogram/marksubjects/delete/${id}&${id2}`)
        .then(response => {
          console.log('Delete', response)
          setCount(count+1)
        })
        .catch(err => console.log(err));
      }

    return (
        <div className='container'>
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
                              <Link className='btn btn-sm' to={`/marksubjects/edit/${mark.studentId}&${mark.subjectId}`}>Edit</Link>
                              <button onClick={e =>deleteMark(mark.studentId, mark.subjectId, e)} className='btn btn-sm'>Delete</button>
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

