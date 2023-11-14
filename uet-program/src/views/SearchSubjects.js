import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';

export default function SearchSubjects({ onSearch }) {
  const [searchTermId, setSearchTermId] = useState('');
  const [searchTermProgram, setSearchTermProgram] = useState('');
  const [status, setStatus] = useState('');
  const [student, setStudent] = useState('');
  const [roleTypeList, setRoleTypeList] = useState([]);
  const [roleType, setRoleType] = useState('');
  const [subjectList, setSubjectList] = useState([]);

//   const handleChange1 = (event) => {
//     setSearchTermId(event.target.value);
//   };

//   const handleChange2 = (event) => {
//     setSearchTermProgram(event.target.value);
//   };

  useEffect(() => {
    axios.get('http://localhost:8080/myprogram/subjects/new')
        .then(response => {
        console.log(response.data.listOfSubjectId)
        setRoleTypeList(response.data.listRoleType)
        })
        .catch(error => console.log(error));
    },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:8080/myprogram/searchSubject/${searchTermId}/${searchTermProgram}?status=${status}&roleType=${roleType}`)
            .then(response => {
            console.log(response.data)
            setSubjectList(response.data)
            })
            .catch(error => console.log(error));
  };

  const groupedSubjects = {};
    subjectList.forEach(subject => {
      if (!groupedSubjects[subject.roleType]) {
        groupedSubjects[subject.roleType] = [];
      }
      groupedSubjects[subject.roleType].push(subject);
    });

  return (
    <div className="container">
    <br></br>
    <Form inline onSubmit={event =>handleSubmit(event)}>
        <div className="form-group">
            <label>Student ID:</label>
            <input type="text" className="form-control" onChange={event => setSearchTermId(event.target.value)}></input><br></br>
        </div>
        <div className="form-group">
            <label>Program:</label> 
            <input type="text" className="form-control" onChange={event => setSearchTermProgram(event.target.value)}></input><br></br>
        </div>
        <div className="form-group">
            <label>Status:</label>
            <Select 
                name="status"
                options={[{value: "finished", label: "finished"},{value: "unfinished", label: "unfinished"}]}
                placeholder='None Selected'
                onChange={e => setStatus(e.value)}
                className="form-control"
            >
            </Select><br></br>
        </div>
        <div className="form-group">
            <label>Role Type:</label>
            <Select 
                name="roleType"
                options={roleTypeList.map(t=>({value: t, label: t}))}
                placeholder='None Selected'
                onChange={e => setRoleType(e.value)}
                className="form-control"
            >
            </Select><br></br>
        </div>
      <br></br>
      <Button type="submit" variant="outline-success">Search</Button>
      <br></br>
    </Form>
      <table className="table table-hover">
        </table>
        <br></br>
            <h1 className="text-center">Subject page</h1>
            {Object.keys(groupedSubjects).map(roleType => (
            <div key={roleType}>
            <h2>{roleType}</h2>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SubjectName</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Mark</th>
                </tr>
              </thead >
              <tbody>
              {groupedSubjects[roleType].map((subject, idx) => (
                <tr key={idx}>
                  <th scope="row">{subject.subjectName}</th>
                  <td>{subject.credit}</td>
                  <td>{subject.mark}</td>
                  <td>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
            ))}
    </div>
    
  )
}


