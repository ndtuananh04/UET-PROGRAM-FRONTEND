import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-dropdown-select";

const URL = 'http://localhost:8080/myprogram/marksubjects/new'

var check = 0;
export default function AddMark() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "subjectId": "",
        "mark": 0
    })

    const [listStudentId, setListStudentId] = useState([])
    const [listSubjectId, setListSubjectId] = useState([])
    const [studentId, setStudentId] = useState("")
    const [subjectId, setSubjectId] = useState("")
    
    const getMarkInfo = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setListStudentId(response.data.listOfStudentId)
            setListSubjectId(response.data.listOfSubjectId)
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
                setPost({...post, subjectId: subjectId})
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
    }, [post.subjectId])

    return (
        <div className="container">
            {
              listStudentId.length < 1 ? getMarkInfo() : ''
            }
            <br></br>
            <div>
                <h1 className="text-center">Add Mark</h1>
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
                    <label>Subject ID:</label>
                    <Select 
                        name="subjectId"
                        options={listSubjectId.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setSubjectId(((e.map(obj => obj.value))).toString())}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Mark:</label> 
                    <input type="number" className="form-control" onChange={handleInput} name="mark"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
