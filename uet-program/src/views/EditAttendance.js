import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default function EditAttendance() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "programFullCode": "",
        "startDate": "",
        "endDate": ""
    })

    const {id} = useParams();
    const [listStudentId, setListStudentId] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    
    useEffect(() => {
        // axios.get(`http://localhost:8080/myprogram/attendances/edit/${id}`)
        //     .then(response => {
        //     console.log(response.data)
        //     setListStudentId(response.data.listOfStudentId)
        //     setListProgramCode(response.data.listOfProgramFullCode)
        //     setPost({...post, studentId: response.data.studentId, programFullCode: response.data.programFullCode,
        //     startDate: response.data.startDate, endDate: response.data.endDate})
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        `attendances/edit/${id}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setListStudentId(response.data.listOfStudentId)
            setListProgramCode(response.data.listOfProgramFullCode)
            setPost({...post, studentId: response.data.studentId, programFullCode: response.data.programFullCode,
            startDate: response.data.startDate, endDate: response.data.endDate})
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
        axios.put('http://localhost:8080/myprogram/attendances/edit/save', post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
        request(
        "PUT",
        'attendances/edit/save',
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
                <h1 className="text-center">Edit Attendance</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student ID:</label> 
                    <input value={post.studentId} type="text" className="form-control" name="studentId"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Program Full Code:</label> 
                    <input value={post.programFullCode} type="text" className="form-control" name="program"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Start Date:</label> 
                    <input value={post.startDate} type="date" className="form-control" onChange={handleInput} name="startDate"></input><br></br>
                </div>
                <div className="form-group">
                    <label>End Date:</label> 
                    <input value={post.endDate} type="date" className="form-control" onChange={handleInput} name="endDate"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
