import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-dropdown-select";

const URL = 'http://localhost:8080/myprogram/programsubjects/new'

var check = 0;
export default function AddProgramSubject() {
   
    const [post, setPost] = useState({
        "programFullCode": "",
        "subjectId": ""
    })

    const [listSubjectId, setListSubjectId] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    const [subjectId, setSubjectId] = useState("")
    const [programCode, setProgramCode] = useState("")
    
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
        setPost({...post, programFullCode: programCode})
        console.log("submitnay")
    }
    
    useEffect(() => {   
        if (post.programFullCode !== "") {
                console.log("first")
                setPost({...post, subjectId: subjectId})
            } 
    }, [post.programFullCode]);

    useEffect(() => {
        if (check > 1) {
            console.log("dc roi")
            console.log(post)
                axios.post(URL, post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
        }
        check++;
    }, [post.subjectId])

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
                        onChange={e => setProgramCode(((e.map(obj => obj.value))).toString())}
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
                        onChange={e => setSubjectId(((e.map(obj => obj.value))).toString())}
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
