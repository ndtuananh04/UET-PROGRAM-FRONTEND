import axios from 'axios';
import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [student, setStudent] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:8080/myprogram/searchid/${searchTerm}`)
            .then(response => {
            console.log(response.data)
            setStudent(response.data)
            })
            .catch(error => console.log(error));
  };

  return (
    <div className="container">
    <br></br>
    <Form inline onSubmit={event =>handleSubmit(event)}>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        value={searchTerm}
        onChange={handleChange}
      /><br></br>
      <Button type="submit" variant="outline-success">Search</Button>
      <br></br>
      <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">StudentID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date Of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Class</th>
                  <th scope="col">Program</th>
                </tr>
              </thead>
                 <tbody>
                    <tr>
                      <th scope="row">{student.studentId}</th>
                      <td>{student.name}</td>
                      <td>{student.dateOfBirth}</td>
                      <td>{student.gender}</td>
                      <td>{student.address}</td>
                      <td>{student.phone}</td>
                      <td>{student.classFullName}</td>
                      <td>{student.programFullCode}</td>
                    </tr>
                  </tbody>
            </table>
    </Form>
    </div>
  )
}


