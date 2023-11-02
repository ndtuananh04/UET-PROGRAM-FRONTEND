import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-dropdown-select';



const URL = 'http://localhost:8080/myprogram/programs/new'
var check = 0;
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
    })

    const [listProgramType, setListProgramType] = useState([])
    const [listFacultyName, setListFacultyName] = useState([])
    const [programType, setProgramType] = useState("")
    const [facultyName, setFacultyName] = useState("")

    const getProgramInfo = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setListProgramType(response.data.programTypeList)
            setListFacultyName(response.data.listOfFacultyName)
            })
            .catch(error => console.log(error));
    }

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        setPost({...post, programType: programType})
        console.log("submitnay")
    }

    useEffect(() => {   
        if (post.programType !== "") {
                console.log("first")
                setPost({...post, facultyName: facultyName})
        } 
    }, [post.programType]);

    useEffect(() => {
        if (check > 1) {
            console.log("dc roi")
            console.log(post)
                axios.post(URL, post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
        }
        check++;
    }, [post.facultyName])

    return (
        <div className="container">
            {
                listProgramType.length < 1 ? getProgramInfo() : ''
            }
            <br></br>
            <div>
                <h1 className="text-center">Add Program</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Program Code:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="programCode"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Program Name:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="programName"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Period:</label>
                    <input type="number" className="form-control" onChange={handleInput} name="period"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Credits:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalCredits"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Mandatory:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalOfMandatory"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Optional:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalOfOptional"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of OptionalReinforcement:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalOfOptionalReinforcement"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Physical:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalOfPhysical"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of NationalDefense:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalOfNationalDefense"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Additional:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalOfAdditional"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of GraduationInternship:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="totalOfGraduationInternship"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Program Type:</label>
                    <Select 
                        name="programType"
                        options={listProgramType.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setProgramType(((e.map(obj => obj.value))).toString())}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Faculty Name:</label>
                    <Select 
                        name="facultyName"
                        options={listFacultyName.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setFacultyName(((e.map(obj => obj.value))).toString())}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}
