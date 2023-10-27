import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/programs'

export default function Program() {
    const [programList, setProgramList] = useState([]);
    const getPrograms = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setProgramList(response.data)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='container'>
            {
              programList.length < 1 ? getPrograms() : ''
            }
            <br></br>
            <h1 className="text-center">Program page</h1>
            <button onClick={getPrograms}>Get Programs</button>
            <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Program Code</th>
                      <th scope="col">Program Name</th>
                      <th scope="col">Period</th>
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
                    </tr>
                  </thead>
                  {
                    programList.length >= 1 ? programList.map((program, idx) => {
                        return <tbody key={idx}>
                                <tr>
                                  <th scope="row">{program.programCode}</th>
                                  <td>{program.programName}</td>
                                  <td>{program.period}</td>
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
                                </tr>
                                </tbody>
                    })
                    : ''
                    }
                </table>
            </div>
            <Link to="/programs/new">Add Program</Link>
        </div>
    )
}