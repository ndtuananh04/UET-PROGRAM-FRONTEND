import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-dropdown-select";
import { useParams } from 'react-router-dom';

var check = 0;
export default function EditSubject() {
    
    
    const [post, setPost] = useState({
        "subjectid": "",
        "subjectName": "",
        "credit": 0,
        "roleType": "",
        "prerequisiteSubjectId": []
    })
    const {id} = useParams();
    const [subjectList, setSubjectList] = useState([])
    const [roleTypeList, setRoleTypeList] = useState([])
    const [value, setValue] = useState([])
    const [typeRole, setTypeRole] = useState("")
    
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        setPost({...post, roleType: typeRole})
        console.log("submitnay")
    }
    
    useEffect(() => {   
        if (post.roleType !== "") {
                console.log("roleTypefirst")
                setPost({...post, prerequisiteSubjectId: value})
            } 
    }, [post.roleType]);

    useEffect(() => {
        if (check > 1) {
            console.log("dc roi")
                axios.put('http://localhost:8080/myprogram/subjects/edit/save', post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
        }
        check++;
    }, [post.prerequisiteSubjectId])

    useEffect(() => {
        axios.get(`http://localhost:8080/myprogram/subjects/edit/${id}`)
            .then(response => {
            console.log(response.data.listOfSubjectId)
            setSubjectList(response.data.listOfSubjectId)
            setRoleTypeList(response.data.listRoleType)
            })
            .catch(error => console.log(error));
            console.log(test)
    }, [])

    return (
        <div className="container">
            <br></br>
            <div>
                <h1 className="text-center">Edit Subject</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Subject ID:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="subjectid"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Subject Name:</label> 
                    <input value="ac" type="text" className="form-control" onChange={handleInput} name="subjectName"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Credit:</label> 
                    <input type="number" className="form-control" onChange={handleInput} name="credit"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Role Type:</label>
                    <Select 
                        name="roleType"
                        options={roleTypeList.map(tt=>({value: tt, label: tt}))}
                        placeholder='None Selected'
                        onChange={e => setTypeRole(((e.map(obj => obj.value))).toString())}
                        className="form-control"
                        value={{ value: "MANDATORY", label: "MANDATORY" }}
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Prerequisite Subject:</label>
                    <Select 
                        name="prerequisiteSubjectId"
                        options={subjectList.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        multi
                        onChange={valueT => setValue(valueT.map(obj => obj.value))}
                        className="form-control"
                        defaultValue={test.map(t=>({value: t, label: t}))}
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


