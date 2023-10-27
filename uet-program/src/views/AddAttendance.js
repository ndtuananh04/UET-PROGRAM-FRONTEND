import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-dropdown-select";

const URL = 'http://localhost:8080/myprogram/attendances/new'

var check = 0;
export default function AddAttendance() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "programFullCode": "",
        "startDate": "",
        "endDate": ""
    })

    const [listStudentId, setListStudentId] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    const [studentId, setStudentId] = useState("")
    const [programCode, setProgramCode] = useState("")
    
    const getAttendanceInfo = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setListStudentId(response.data.listOfStudentId)
            setListProgramCode(response.data.listOfProgramFullCode)
            })
            .catch(error => console.log(error));
    }


    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        setPost({...post, studentId: studentId})
        console.log("submitnay")
    }
    
    useEffect(() => {   
        if (post.studentId !== "") {
                console.log("first")
                setPost({...post, programFullCode: programCode})
            } 
    }, [post.studentId]);

    useEffect(() => {
        if (check > 1) {
            console.log("dc roi")
            console.log(post)
                axios.post(URL, post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
        }
        check++;
    }, [post.programFullCode])

    return (
        <div className="container">
            {
              listStudentId.length < 1 ? getAttendanceInfo() : ''
            }
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
                        onChange={e => setStudentId(((e.map(obj => obj.value))).toString())}
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
                        onChange={e => setProgramCode(((e.map(obj => obj.value))).toString())}
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
