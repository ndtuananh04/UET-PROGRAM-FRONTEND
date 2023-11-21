import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const URL = 'http://localhost:8080/myprogram/obtaincerts/new'

export default function AddCert() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "certificateType": "",
        "levelLanguage": "",
        "submissionDate": "",
    })

    const [certTypeList, setCertTypeList] = useState([])
    const [levelList, setLevelList] = useState([])
    
    useEffect(() => {
        axios.get(URL)
            .then(response => {
            console.log(response.data.listOfSubjectId)
            setCertTypeList(response.data.certificateTypeList)
            setLevelList(response.data.levelLanguageList)
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
        <div className="container pt-5">
            <br></br>
            <div>
                <h1 className="text-center">Add Certificate</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student ID:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="studentId"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Certificate Type:</label>
                    <Select 
                        name="certificateType"
                        options={certTypeList.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, certificateType: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Language Level:</label>
                    <Select 
                        name="levelLanguage"
                        options={levelList.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, levelLanguage: e.value})}
                        className="form-control"
                    >
                    </Select>
                </div>
                <div className="form-group">
                    <label>Submission Date:</label> 
                    <input type="date" className="form-control" onChange={handleInput} name="submissionDate"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>
        </div>
    )
}


