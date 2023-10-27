import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';


const URL = 'http://localhost:8080/myprogram/classrooms/new'

export default function AddClassroom() {
    
    const [post, setPost] = useState({
        "cohort": "",
        "nameClass": ""
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
                
                Cohort: <input type="text" onChange={handleInput} name="cohort"></input><br></br>
                Class Name: <input type="text" onChange={handleInput} name="nameClass"></input><br></br>
                <button>Submit</button>
            </form>
            
        </div>
    )
}


