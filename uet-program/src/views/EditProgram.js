import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

export default function EditProgram() {
    
    const [post, setPost] = useState({
        "programCode": "",
        "programName": "",
        "period": "",
        "duration": 0,
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

    const {id} = useParams();
    const [listProgramType, setListProgramType] = useState([])
    const [listFacultyName, setListFacultyName] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/myprogram/programs/edit/${id}`)
            .then(response => {
            console.log(response.data)
            setListProgramType(response.data.programTypeList)
            setListFacultyName(response.data.listOfFacultyName)
            setPost({...post, programCode: response.data.programCode, programName: response.data.programName,
                period: response.data.period, duration: response.data.duration, programType: response.data.programType,
                facultyName: response.data.facultyName, totalCredits: response.data.totalCredits, totalOfMandatory: response.data.totalOfMandatory,
                totalOfOptional: response.data.totalOfOptional, totalOfOptionalReinforcement: response.data.totalOfOptionalReinforcement,
                totalOfPhysical: response.data.totalOfPhysical, totalOfNationalDefense: response.data.totalOfNationalDefense,
                totalOfAdditional: response.data.totalOfAdditional, totalOfGraduationInternship: response.data.totalOfGraduationInternship,
                })
            })
            .catch(error => console.log(error));
    },[])

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8080/myprogram/programs/edit/save', post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    return (
        <div className="container pt-5">
            <br></br>
            <div>
                <h1 className="text-center">Edit Program</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Program Code:</label>
                    <input value={post.programCode} type="text" className="form-control" name="programCode"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Program Name:</label>
                    <input value={post.programName} type="text" className="form-control" onChange={handleInput} name="programName"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Period:</label>
                    <input value={post.period} type="number" className="form-control" name="period"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Duration:</label>
                    <input value={post.duration} type="number" step="0.5" className="form-control" onChange={handleInput} name="duration"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Credits:</label>
                    <input value={post.totalCredits} type="text" className="form-control" onChange={handleInput} name="totalCredits"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Mandatory:</label>
                    <input value={post.totalOfMandatory} type="text" className="form-control" onChange={handleInput} name="totalOfMandatory"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Optional:</label>
                    <input value={post.totalOfOptional} type="text" className="form-control" onChange={handleInput} name="totalOfOptional"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of OptionalReinforcement:</label>
                    <input value={post.totalOfOptionalReinforcement} type="text" className="form-control" onChange={handleInput} name="totalOfOptionalReinforcement"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Physical:</label>
                    <input value={post.totalOfPhysical} type="text" className="form-control" onChange={handleInput} name="totalOfPhysical"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of NationalDefense:</label>
                    <input value={post.totalOfNationalDefense} type="text" className="form-control" onChange={handleInput} name="totalOfNationalDefense"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of Additional:</label>
                    <input value={post.totalOfAdditional} type="text" className="form-control" onChange={handleInput} name="totalOfAdditional"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Total Of GraduationInternship:</label>
                    <input value={post.totalOfGraduationInternship} type="text" className="form-control" onChange={handleInput} name="totalOfGraduationInternship"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Program Type:</label>
                    <Select 
                        name="programType"
                        options={listProgramType.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, programType: e.value})}
                        className="form-control"
                        value={{label: post.programType, value: post.programType}}
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Faculty Name:</label>
                    <Select 
                        name="facultyName"
                        options={listFacultyName.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, facultyName: e.value})}
                        className="form-control"
                        value={{label: post.facultyName, value: post.facultyName}}
                    >
                    </Select><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Update</button>
            </form>
            
        </div>
    )
}
