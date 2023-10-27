import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UpSubject from './UpSubject';
import Select from "react-dropdown-select";

var subjectList={
    "subjectid": "",
    "subjectName": "",
    "credit": 0,
    "roleType": "",
    "prerequisiteSubjectId": [],
    "listRoleType": [
        "MANDATORY",
        "OPTIONAL",
        "OPTIONALREINFORCEMENT",
        "PHYSICAL",
        "NATIONALDEFENCE",
        "ADDITIONAL",
        "GRADUATIONINTERSHIP"
    ],
    "listOfSubjectId": []
};
var x = true
var y = true
var check = 0
const URL = 'http://localhost:8080/myprogram/subjects/new'

export default function AddSubject() {
  
   
    const [post, setPost] = useState({
        "subjectid": "",
        "subjectName": "",
        "credit": 0,
        "roleType": "",
        "prerequisiteSubjectId": []
    })
    const [subjectList, setSubjectList] = useState([])
    const [roleTypeList, setRoleTypeList] = useState([])
    const [value, setValue] = useState([])
    const [typeRole, setTypeRole] = useState("")
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    const handleInput2 = (e) => {
        console.log("danginput")
        setTypeRole(((e.map(obj => obj.value))).toString());
        setPost({...post, roleType: typeRole})
        console.log(post)
        console.log("ketthucinput")
    }
    function handleSubmit(event) {
        event.preventDefault();
        setPost({...post, roleType: typeRole})
        if(value.length === 0) {
        x=false;
        } else {
            console.log(typeRole);
         console.log(value);
        
        setPost({...post, prerequisiteSubjectId: value})
        }
    }
    
    useEffect(() => {
        if (x === true) {
            console.log("123")
            
            if (post.prerequisiteSubjectId.length > 0) {
                console.log("hha")
                y=false;
                console.log(post);
                
                if(post.roleType !== "") {
                    console.log(post)
                    console.log("ght")
                    axios.post(URL, post)
                    .then(response => console.log(response))
                    .catch(err => console.log(err));
                    
                }
            } 
        } else {
            if (post.roleType !== "") {
                console.log(post)
                axios.post(URL, post)
                    .then(response => console.log(response))
                    .catch(err => console.log(err));
            } 
        }
        
    }, [post]);

    // useEffect(() => {
    //         if (post.roleType !== "") {
    //             console.log(post)
    //             axios.post(URL, post)
    //                 .then(response => console.log(response))
    //                 .catch(err => console.log(err));
    //         } 
        
    // },[post.roleType])

    // useEffect(() => {
    //     if (post.roleType !== "") {
    //         console.log(post)
    //         axios.post(URL, post)
    //             .then(response => console.log(response))
    //             .catch(err => console.log(err));
    //     } 
    
    // },[post])
    const getSubjects = (e) => {
        // e.preventDefault()
        axios.get(URL)
            .then(response => {
            console.log(response.data.listOfSubjectId)
            setSubjectList(response.data.listOfSubjectId)
            setRoleTypeList(response.data.listRoleType)
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="container ">
            {
              subjectList.length < 1 ? getSubjects() : ''
            }
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
                    <label>Role Type:</label>
                    {/* <select className="form-control" onChange={handleInput} name="roleType">
                        <option>-Choose-</option>
                        <option>MANDATORY</option>
                        <option>OPTIONAL</option>
                        <option>OPTIONALREINFORCEMENT</option>
                        <option>PHYSICAL</option>
                        <option>NATIONALDEFENCE</option>
                        <option>ADDITIONAL</option>
                        <option>GRADUATIONINTERSHIP</option>
                    </select><br></br> */}
                    <Select 
                        name="roleType"
                        options={roleTypeList.map(tt=>({value: tt, label: tt}))}
                        placeholder='None Selected'
                        onChange={handleInput2}
                        className="form-control"
                    >
                    </Select>
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


