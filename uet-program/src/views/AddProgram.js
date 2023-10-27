import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';


const URL = 'http://localhost:8080/myprogram/programs/new'

export default function AddProgram() {
    
    const [post, setPost] = useState({
        "programCode": "",
        "programName": "",
        "period": "",
        "programType": "",
        "facultyName": "",
        "totalCredits": 0,
        "totalOfMandatory": 0,
        "totalOfOptional": 0,
        "totalOfOptionalReinforcement": 0,
        "totalOfPhysical": 0,
        "totalOfNationalDefense": 0,
        "totalOfAdditional": 0,
        "totalOfGraduationInternship": 0,
        "programTypeList": [],
        "listOfFacultyName": []
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
                Program Code: <input type="text" onChange={handleInput} name="programCode"></input><br></br>
                Program Name: <input type="text" onChange={handleInput} name="programName"></input><br></br>
                Period: <input type="number" onChange={handleInput} name="period"></input><br></br>
                Program Type: <input type="text" onChange={handleInput} name="programType"></input><br></br>
                Faculty Name: <input type="text" onChange={handleInput} name="facultyName"></input><br></br>
                Total Credits: <input type="text" onChange={handleInput} name="totalCredits"></input><br></br>
                Total Of Mandatory: <input type="text" onChange={handleInput} name="totalOfMandatory"></input><br></br>
                Total Of Optional: <input type="text" onChange={handleInput} name="totalOfOptional"></input><br></br>
                Total Of OptionalReinforcement: <input type="text" onChange={handleInput} name="totalOfOptionalReinforcement"></input><br></br>
                Total Of Physical: <input type="text" onChange={handleInput} name="totalOfPhysical"></input><br></br>
                Total Of NationalDefense: <input type="text" onChange={handleInput} name="totalOfNationalDefense"></input><br></br>
                Total Of Additional: <input type="text" onChange={handleInput} name="totalOfAdditional"></input><br></br>
                Total Of GraduationInternship: <input type="text" onChange={handleInput} name="totalOfGraduationInternship"></input><br></br>
                <button>Submit</button>
            </form>
            
        </div>
    )
}
