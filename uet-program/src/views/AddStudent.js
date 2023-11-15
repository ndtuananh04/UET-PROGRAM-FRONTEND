import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Routes, Route, Link } from 'react-router-dom';

const URL = 'http://localhost:8080/myprogram/students/new'

export default function AddStudent() {
    
    const [post, setPost] = useState({
        "studentId": "",
        "name": "",
        "dateOfBirth": "",
        "gender": "",
        "address": "",
        "phone": "",
        "classFullName": ""
    })

    const [studentGender, setStudentGender] = useState([])
    const [studentClass, setStudentClass] = useState([])

    useEffect(()=> {
        axios.get(URL)
            .then(response => {
            setStudentGender(response.data.listOfGender)
            setStudentClass(response.data.listOfClassroom)
            })
            .catch(error => console.log(error));
    },[])

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log(post)
        axios.post(URL, post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    return (    
        <div className="container">
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
                    <label>Date Of Birth:</label>
                    <input type="date" className="form-control" onChange={handleInput} name="dateOfBirth"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <Select
                        name="gender"
                        options={studentGender.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, gender: e.value})}
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
                        onChange={e => setPost({...post, classFullName: e.value})}
                        className='form-control'
                    ></Select>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}
