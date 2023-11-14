import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

export default function EditStudent() {
    
    const [post, setPost] = useState({
        "studentId": "",
        "name": "",
        "age": 0,
        "gender": "",
        "address": "",
        "phone": "",
        "classFullName": ""
    })
    const {id} = useParams();
    const [studentGender, setStudentGender] = useState([])
    const [studentClass, setStudentClass] = useState([])

    useEffect(()=> {
        axios.get(`http://localhost:8080/myprogram/students/edit/${id}`)
            .then(response => {
            console.log(response.data)
            setStudentGender(response.data.listOfGender)
            setStudentClass(response.data.listOfClassroom)
            setPost({...post, studentId: response.data.studentId, name: response.data.name,
            age: response.data.age, address: response.data.address, phone: response.data.phone,
            gender: response.data.gender, classFullName: response.data.classFullName})
            })
            .catch(error => console.log(error));
    },[])

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8080/myprogram/students/edit/save', post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
    }

    return (    
        <div className="container">
            <br></br>
            <div>
                <h1 className="text-center">Edit Student</h1>
            </div>
            <form onSubmit={handleSubmit}>  
                <div className='form-group'>
                    <label>Student ID:</label>
                    <input value={post.studentId} type="text" className="form-control" name="studentId"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Student Name:</label>
                    <input value={post.name} type="text" className="form-control" onChange={handleInput} name="name"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input value={post.age} type="number" className="form-control" onChange={handleInput} name="age"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <Select
                        name="gender"
                        options={studentGender.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, gender: e.value})}
                        className='form-control'
                        value={{label: post.gender, value: post.gender}}
                    >
                    </Select><br></br>
                </div>
                <div className="form-group"> 
                    <label>Address:</label>
                    <input value={post.address} type="text" className="form-control" onChange={handleInput} name="address"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Phone: </label>
                    <input value={post.phone} type="text" className="form-control" onChange={handleInput} name="phone"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Class Full Name:</label>
                    <Select
                        name='class'
                        options={studentClass.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, classFullName: e.value})}
                        className='form-control'
                        value={{label: post.classFullName, value: post.classFullName}}
                    ></Select>
                </div>
                <br></br>
                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}
