import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';


const URL = 'http://localhost:8080/myprogram/faculties/new'

export default function AddFaculty() {
    
    const [post, setPost] = useState({
        "facultyName": "",
        "address": "",
        "email": "",
        "phone": "",
        "website": ""
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
                Faculty Name: <input type="text" onChange={handleInput} name="facultyName"></input><br></br>
                Address: <input type="text" onChange={handleInput} name="address"></input><br></br>
                Email: <input type="text" onChange={handleInput} name="email"></input><br></br>
                Phone: <input type="text" onChange={handleInput} name="phone"></input><br></br>
                Website: <input type="text" onChange={handleInput} name="website"></input><br></br>
                <button>Submit</button>
            </form>
            
        </div>
    )
}
