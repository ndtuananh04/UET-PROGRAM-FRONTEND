import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { useParams } from 'react-router-dom';

export default function EditSubject() {
    
    const [post, setPost] = useState({
        "subjectid": "",
        "subjectName": "",
        "credit": 0,
        "prerequisiteSubjectId": []
    })
    const {id} = useParams();
    const [subjectList, setSubjectList] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8080/myprogram/subjects/edit/${id}`)
            .then(response => {
            console.log(response.data)
            setSubjectList(response.data.listOfSubjectId)
            setPost({...post, subjectid: response.data.subjectid, subjectName: response.data.subjectName, credit: response.data.credit,
            prerequisiteSubjectId: response.data.prerequisiteSubjectId, roleType: response.data.roleType})
            })
            .catch(error => console.log(error));
    }, [])

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8080/myprogram/subjects/edit/save', post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    return (
        <div className="container pt-5">
            <br></br>
            <div>
                <h1 className="text-center">Edit Subject</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Subject ID:</label>
                    <input value={post.subjectid} type="text" className="form-control" name="subjectid"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Subject Name:</label> 
                    <input value={post.subjectName} type="text" className="form-control" onChange={handleInput} name="subjectName"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Credit:</label> 
                    <input value={post.credit} type="number" className="form-control" onChange={handleInput} name="credit"></input><br></br>
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
                <button className="btn btn-primary">Update</button>
            </form>
            <br></br>

        </div>
    )
}


