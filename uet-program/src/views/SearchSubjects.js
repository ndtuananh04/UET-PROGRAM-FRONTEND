import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';


export default function SearchSubjects() {
  // const [searchTermId, setSearchTermId] = useState('');
  // const [searchTermProgram, setSearchTermProgram] = useState('');
  const [status, setStatus] = useState('');
  const [student, setStudent] = useState('');
  const [roleTypeList, setRoleTypeList] = useState([]);
  const [roleType, setRoleType] = useState('');
  const [subjectList, setSubjectList] = useState([]);
  const {id} = useParams();
  const {id2} = useParams();

//   const handleChange1 = (event) => {
//     setSearchTermId(event.target.value);
//   };

//   const handleChange2 = (event) => {
//     setSearchTermProgram(event.target.value);
//   };

  useEffect(() => {
    // axios.get('http://localhost:8080/myprogram/programsubjects/new')
    //     .then(response => {
    //     setRoleTypeList(response.data.listRoleType)
    //     })
    //     .catch(error => console.log(error));
    request(
        "GET",
        'programsubjects/new',
        {}).then(
        (response) => {
          console.log(response.data)
          setRoleTypeList(response.data.listRoleType)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
    // axios.get(`http://localhost:8080/myprogram/searchSubject/${id}/${id2}`)
    //     .then(response => {
    //     console.log(response.data)
    //     setSubjectList(response.data)
    //     })
    //     .catch(error => console.log(error));
    request(
        "GET",
        `searchSubject/${id}/${id2}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setSubjectList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    // axios.get(`http://localhost:8080/myprogram/searchSubject/${id}/${id2}?status=${status}&roleType=${roleType}`)
    //         .then(response => {
    //         console.log(response.data)
    //         setSubjectList(response.data)
    //         })
    //         .catch(error => console.log(error));
    request(
        "GET",
        `searchSubject/${id}/${id2}?status=${status}&roleType=${roleType}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setSubjectList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
  };

  const groupedSubjects = {};
    subjectList.forEach(subject => {
      if (!groupedSubjects[subject.roleType]) {
        groupedSubjects[subject.roleType] = [];
      }
      groupedSubjects[subject.roleType].push(subject);
    });

  return (
    <div className="container pt-5">
    <br></br>
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className='btn btn-primary'>Search</button>
      <br></br>
    </form>
      <table className="table table-hover">
        </table>
        <br></br>
            <h1 className="text-center">Program Subjects</h1>
            {Object.keys(groupedSubjects).map(roleType => (
            <div key={roleType}>
            <h2>{roleType}</h2>
            <table className="table table-hover table-info">
              <thead>
                <tr className='table-primary'>
                  <th scope="col" style={{ width: '600px' }}>SubjectName</th>
                  <th scope="col" style={{ width: '150px' }}>Credit</th>
                  { 
                    subjectList[0].mark != null
                    ? <th scope="col">Mark</th> : <th scope="col">Prerequisite Subject</th>
                  }
                </tr>
              </thead >
              <tbody>
              {groupedSubjects[roleType].map((subject, idx) => (
                <tr key={idx}>
                  <th scope="row">{subject.subjectName}</th>
                  <td>{subject.credit}</td>
                  <td>
                    {
                      subject.mark!=null ? subject.mark : subject.prerequisiteSubjectId.join(", ")
                    }
                  
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


