import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';

const URL = baseURL() + '/programs'

export default function Program() {
  const [count, setCount] = useState(0);  
  const [programList, setProgramList] = useState([]);
  useEffect(() => {
    request(
      "GET",
      'programs',
      {}).then(
      (response) => {
        console.log(response.data)
        setProgramList(response.data)
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
    const deleteProgram = (id, id2, e) => {
      e.preventDefault();
      axios.delete(baseURL + `/programs/delete/${id}-${id2}`)
      .then(response => {
        console.log('Delete', response)
        setCount(count+1)
      })
      .catch(err => console.log(err));
      request(
        "DELETE",
        `programs/delete/${id}-${id2}`,
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
            <h1 className="text-center">Program page</h1>
            <div className="table-responsive">
                <table className="tabler">
                  <thead>
                    <tr className='table-primary trr'>
                      <th className='thr'>Program Code</th>
                      <th className='thr'>Program Name</th>
                      <th className='thr'>Period</th>
                      <th className='thr'>Duration</th>
                      <th className='thr'>Program Type</th>
                      <th className='thr'>Faculty Name</th>
                      <th className='thr'>TotalCredits</th>
                      <th className='thr'>TotalOfMandatory</th>
                      <th className='thr'>TotalOfOptional</th>
                      <th className='thr'>TotalOfOptionalReinforcement</th>
                      <th className='thr'>TotalOfPhysical</th>
                      <th className='thr'>TotalOfNationalDefense</th>
                      <th className='thr'>TotalOfAdditional</th>
                      <th className='thr'>TotalOfGraduationInternship</th>
                      <th className='thr'>Change</th>
                    </tr>
                  </thead>
                  {
                    programList.length >= 1 ? programList.map((program, idx) => {
                        return <tbody key={idx}>
                                <tr>
                                  <td className='tdr'>{program.programCode}</td>
                                  <td className='tdr'>{program.programName}</td>
                                  <td className='tdr'>{program.period}</td>
                                  <td className='tdr'>{program.duration}</td>
                                  <td className='tdr'>{program.programType}</td>
                                  <td className='tdr'>{program.facultyName}</td>
                                  <td className='tdr'>{program.totalCredits}</td>
                                  <td className='tdr'>{program.totalOfMandatory}</td>
                                  <td className='tdr'>{program.totalOfOptional}</td>
                                  <td className='tdr'>{program.totalOfOptionalReinforcement}</td>
                                  <td className='tdr'>{program.totalOfPhysical}</td>
                                  <td className='tdr'>{program.totalOfNationalDefense}</td>
                                  <td className='tdr'>{program.totalOfAdditional}</td>
                                  <td className='tdr'>{program.totalOfGraduationInternship}</td>
                                  <td className='tdr'>
                                    <Link className='btn btn-sm btn-outline-info' to={`/programs/edit/${program.programCode}-${program.period}`}>Edit</Link>
                                    <button onClick={e =>deleteProgram(program.programCode, program.period, e)} className='btn btn-sm btn-outline-danger'>Delete</button>
                                  </td>
                                </tr>
                                </tbody>
                    })
                    : ''
                    }
                </table>
            </div>
            <Link to="/programs/new"><button className="btn btn-primary">Add Program</button></Link>
        </div>
    )
}