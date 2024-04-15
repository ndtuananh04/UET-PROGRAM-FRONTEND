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
                <table className="table table-hover table-bordered table-info">
                  <thead>
                    <tr className='table-primary'>
                      <th scope="col">Program Code</th>
                      <th scope="col">Program Name</th>
                      <th scope="col">Period</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Program Type</th>
                      <th scope="col">Faculty Name</th>
                      <th scope="col">TotalCredits</th>
                      <th scope="col">TotalOfMandatory</th>
                      <th scope="col">TotalOfOptional</th>
                      <th scope="col">TotalOfOptionalReinforcement</th>
                      <th scope="col">TotalOfPhysical</th>
                      <th scope="col">TotalOfNationalDefense</th>
                      <th scope="col">TotalOfAdditional</th>
                      <th scope="col">TotalOfGraduationInternship</th>
                      <th scope="col">Change</th>
                    </tr>
                  </thead>
                  {
                    programList.length >= 1 ? programList.map((program, idx) => {
                        return <tbody key={idx}>
                                <tr>
                                  <th scope="row">{program.programCode}</th>
                                  <td>{program.programName}</td>
                                  <td>{program.period}</td>
                                  <td>{program.duration}</td>
                                  <td>{program.programType}</td>
                                  <td>{program.facultyName}</td>
                                  <td>{program.totalCredits}</td>
                                  <td>{program.totalOfMandatory}</td>
                                  <td>{program.totalOfOptional}</td>
                                  <td>{program.totalOfOptionalReinforcement}</td>
                                  <td>{program.totalOfPhysical}</td>
                                  <td>{program.totalOfNationalDefense}</td>
                                  <td>{program.totalOfAdditional}</td>
                                  <td>{program.totalOfGraduationInternship}</td>
                                  <td>
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