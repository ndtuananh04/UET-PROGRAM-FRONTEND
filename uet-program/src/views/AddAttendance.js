import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { request, setAuthHeader } from '../helpers/axios_helper';


const URL = 'http://localhost:8080/myprogram/attendances/new'

export default function AddAttendance() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "programFullCode": "",
        "startDate": "",
        "endDate": ""
    })

    const [listStudentId, setListStudentId] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    
    useEffect(() => {
        // axios.get(URL)
        //     .then(response => {
        //     console.log(response.data)
        //     setListStudentId(response.data.listOfStudentId)
        //     setListProgramCode(response.data.listOfProgramFullCode)
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        'attendances/new',
        {}).then(
        (response) => {
          console.log(response.data)
          setListStudentId(response.data.listOfStudentId)
            setListProgramCode(response.data.listOfProgramFullCode)
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

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        // axios.post(URL, post)
        //         .then(response => console.log(response))
        //         .catch(err => console.log(err));
        request(
        "POST",
        'attendances/new',
        post).then(
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
        <div className="container pt-5">
            <br></br>
            <div>
                <h1 className="text-center">Add Attendance</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student ID:</label>
                    <Select 
                        name="studentId"
                        options={listStudentId.map(tt=>({value: tt, label: tt}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, studentId: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Program Full Code:</label>
                    <Select 
                        name="programFullCode"
                        options={listProgramCode.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, programFullCode: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Start Date:</label> 
                    <input type="date" className="form-control" onChange={handleInput} name="startDate"></input><br></br>
                </div>
                <div className="form-group">
                    <label>End Date:</label> 
                    <input type="date" className="form-control" onChange={handleInput} name="endDate"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
