import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";

const URL = 'http://localhost:8080/myprogram/programsubjects/new'

export default function AddProgramSubject() {
   
    const [post, setPost] = useState({
        "programFullCode": "",
        "subjectId": ""
    })

    const [listSubjectId, setListSubjectId] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    
    const getProgramSubjectInfo = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data)
            setListSubjectId(response.data.listOfSubjectId)
            setListProgramCode(response.data.listOfProgramFullCode)
            })
            .catch(error => console.log(error));
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(URL, post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    return (
        <div className="container">
            {
              listProgramCode.length < 1 ? getProgramSubjectInfo() : ''
            }
            <br></br>
            <div>
                <h1 className="text-center">Add Program-Subject</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Faculty:</label>
                    <Select 
                        name="programFullCode"
                        options={listProgramCode.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, programFullCode: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Program Full Code:</label>
                    <Select 
                        name="subjectId"
                        options={listSubjectId.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, subjectId: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
