import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';


const URL = baseURL()  + '/classrooms'

export default function Classroom() {
  const [count,setCount] = useState(0);  
  const [classroomList, setClassroomList] = useState([]);
  useEffect(() => {
    request(
      "GET",
      'classrooms',
      {}).then(
      (response) => {
        console.log(response.data)
        setClassroomList(response.data)
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
    return (
        <div className='container pt-5'>
            <br></br>
            <h1 className="text-center">Classroom page</h1>
            <table className="tabler">
              <thead>
                <tr className='table-primary trr'>
                  <th className='thr'>Cohort</th>
                  <th className='thr'>Class Name</th>
                </tr>
              </thead>
              {
                classroomList.length >= 1 ? classroomList.map((classroom, idx) => {
                    return <tbody key={idx}>
                            <tr>
                              <td className='tdr'>{classroom.cohort}</td>
                              <td className='tdr'>{classroom.nameClass}</td>
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

