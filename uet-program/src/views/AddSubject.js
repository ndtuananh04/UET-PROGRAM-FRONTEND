import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const URL = 'http://localhost:8080/myprogram/subjects/new'

export default function AddSubject() {
   
    const [post, setPost] = useState({
        "subjectid": "",
        "subjectName": "",
        "credit": 0,
        "prerequisiteSubjectId": []
    })

    const [subjectList, setSubjectList] = useState([])
    
    useEffect(() => {
        axios.get(URL)
            .then(response => {
            console.log(response.data.listOfSubjectId)
            setSubjectList(response.data.listOfSubjectId)
            })
            .catch(error => console.log(error));
    },[])

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(post.roleType)
        axios.post(URL, post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    return (
        <div className="container pt-5">
            <br></br>
            <div>
                <h1 className="text-center">Add Subject</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Subject ID:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="subjectid"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Subject Name:</label> 
                    <input type="text" className="form-control" onChange={handleInput} name="subjectName"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Credit:</label> 
                    <input type="number" className="form-control" onChange={handleInput} name="credit"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Prerequisite Subject:</label>
                    <Select 
                        name="prerequisiteSubjectId"
                        options={subjectList.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        isMulti
                        onChange={e => setPost({...post, prerequisiteSubjectId: e.map(obj => obj.value)})}
                        className="form-control"
                        value={post.prerequisiteSubjectId.map(t=>({value: t, label: t}))}
                    >
                    </Select>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}


