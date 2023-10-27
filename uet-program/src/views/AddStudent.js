import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';


const URL = 'http://localhost:8080/myprogram/students/new'

export default function AddStudent() {
    
    const [post, setPost] = useState({
        "studentId": "",
        "name": "",
        "age": 0,
        "gender": "",
        "address": "",
        "phone": "",
        "classFullName": "",
        "listOfGender": [],
        "listOfClassroom": []
    })
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(post)
        axios.post(URL, post)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                Student ID: <input type="text" onChange={handleInput} name="studentId"></input><br></br>
                Student Name: <input type="text" onChange={handleInput} name="name"></input><br></br>
                Age: <input type="number" onChange={handleInput} name="age"></input><br></br>
                Gender: <input type="text" onChange={handleInput} name="gender"></input><br></br>
                Address: <input type="text" onChange={handleInput} name="address"></input><br></br>
                Phone: <input type="text" onChange={handleInput} name="phone"></input><br></br>
                Class Full Name: <input type="text" onChange={handleInput} name="classFullName"></input><br></br>
                <button>Submit</button>
            </form>
            
        </div>
    )
}
