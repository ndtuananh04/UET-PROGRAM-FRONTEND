import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import { Routes, Route, Link } from 'react-router-dom';

// var studentInfo={
//     "studentId": "",
//     "name": "",
//     "age": 0,
//     "gender": "",
//     "address": "",
//     "phone": "",
//     "classFullName": "",
//     "listOfGender": [
//         "Male",
//         "Female"
//     ],
//     "listOfClassroom": [
//         "K67-CA-CLC4",
//         "K68--NCLC"
//     ]
// }
const URL = 'http://localhost:8080/myprogram/students/new'
var check = 0;
export default function AddStudent() {
    
    const [post, setPost] = useState({
        "studentId": "",
        "name": "",
        "age": 0,
        "gender": "",
        "address": "",
        "phone": "",
        "classFullName": ""
    })

    const [studentGender, setStudentGender] = useState([])
    const [studentClass, setStudentClass] = useState([])
    const [sGender, setSGender] = useState([])
    const [sClass, setSClass] = useState([])

    
    const getStudentInfo = (e) => {
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setStudentGender(response.data.listOfGender)
            setStudentClass(response.data.listOfClassroom)
            })
            .catch(error => console.log(error));
    }
        const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        setPost({...post, gender: sGender})
        console.log("submitnay")
    }

    useEffect(() => {   
        if (post.gender !== "") {
                console.log("first")
                setPost({...post, classFullName: sClass})
            } 
    }, [post.gender]);

    useEffect(() => {
        if (check > 1) {
            console.log("dc roi")
                axios.post(URL, post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
        }
        check++;
    }, [post.classFullName])

    return (    
        <div className="container">
            {
                studentClass.length < 1 ? getStudentInfo() : ''
            }
            <br></br>
            <div>
                <h1 className="text-center">Add Student</h1>
            </div>
            <form onSubmit={handleSubmit}>  
                <div className='form-group'>
                    <label>Student ID:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="studentId"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Student Name:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="name"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" className="form-control" onChange={handleInput} name="age"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <Select
                        name="gender"
                        options={studentGender.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setSGender(((e.map(obj => obj.value))).toString())}
                        className='form-control'
                    >
                    </Select><br></br>
                </div>
                <div className="form-group"> 
                    <label>Address:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="address"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Phone: </label>
                    <input type="text" className="form-control" onChange={handleInput} name="phone"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Class Full Name:</label>
                    <Select
                        name='class'
                        options={studentClass.map(t=>({value: t, label: t}))}
                    placeholder='None Selected'
                    onChange={e => setSClass(((e.map(obj => obj.value))).toString())}
                    className='form-control'
                    ></Select>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}
