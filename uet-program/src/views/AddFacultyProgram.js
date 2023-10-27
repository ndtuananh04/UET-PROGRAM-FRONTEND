import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-dropdown-select";

const URL = 'http://localhost:8080/myprogram/facultyprograms/new'

var check = 0;
export default function AddFacultyProgram() {
   
    const [post, setPost] = useState({
        "facultyName": "",
        "programFullCode": ""
    })

    const [listFacultyName, setListFacultyName] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    const [facultyName, setFacultyName] = useState("")
    const [programCode, setProgramCode] = useState("")
    
    const getFacultyProgramInfo = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setListFacultyName(response.data.listOfFacultyName)
            setListProgramCode(response.data.listOfProgramFullCode)
            })
            .catch(error => console.log(error));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setPost({...post, facultyName: facultyName})
        console.log("submitnay")
    }
    
    useEffect(() => {   
        if (post.studentId !== "") {
                console.log("first")
                setPost({...post, programFullCode: programCode})
            } 
    }, [post.facultyName]);

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
              listFacultyName.length < 1 ? getFacultyProgramInfo() : ''
            }
            <br></br>
            <div>
                <h1 className="text-center">Add Falcuty-Program</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Faculty:</label>
                    <Select 
                        name="facultyName"
                        options={listFacultyName.map(tt=>({value: tt, label: tt}))}
                        placeholder='None Selected'
                        onChange={e => setFacultyName(((e.map(obj => obj.value))).toString())}
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
                
            
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
