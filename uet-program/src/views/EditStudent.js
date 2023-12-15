import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default function EditStudent() {
    
    const [post, setPost] = useState({
        "studentId": "",
        "name": "",
        "dateOfBirth": "",
        "gender": "",
        "address": "",
        "phone": "",
        "classFullName": ""
    })
    const {id} = useParams();
    const [studentGender, setStudentGender] = useState([])
    const [studentClass, setStudentClass] = useState([])

    // useEffect(()=> {
    //     axios.get(`http://localhost:8080/myprogram/students/edit/${id}`)
    //         .then(response => {
    //         console.log(response.data)
    //         setStudentGender(response.data.listOfGender)
    //         setStudentClass(response.data.listOfClassroom)
    //         setPost({...post, studentId: response.data.studentId, name: response.data.name,
    //         dateOfBirth: response.data.dateOfBirth, address: response.data.address, phone: response.data.phone,
    //         gender: response.data.gender, classFullName: response.data.classFullName})
    //         })
    //         .catch(error => console.log(error));
    // },[])

    useEffect(() => {
        request(
          "GET",
          `students/edit/${id}`,
          {}).then(
          (response) => {
            console.log(response.data)
            setStudentGender(response.data.listOfGender)
            setStudentClass(response.data.listOfClassroom)
            setPost({...post, studentId: response.data.studentId, name: response.data.name,
            dateOfBirth: response.data.dateOfBirth, address: response.data.address, phone: response.data.phone,
            gender: response.data.gender, classFullName: response.data.classFullName})
          }).catch(
          (error) => {
              if (error.response.status === 401) {
                //   setAuthHeader(null);
              } else {
                  this.setState({data: error.response.code})
              }
          }
      );
      },[])

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        // axios.put('http://localhost:8080/myprogram/students/edit/save', post)
        //         .then(response => console.log(response))
        //         .catch(err => console.log(err));
        console.log(post)
        request(
          "PUT",
          'students/edit/save',
          post).then(
          (response) => {
            console.log(response.data)

          }).catch(
          (error) => {
              if (error.response.status === 401) {
                //   setAuthHeader(null); //nêu bỏ dòng này đi để đỡ pải login lại
              } else {
                  this.setState({data: error.response.code})
              }
          }
      );
    }

    return (    
        <div className="container pt-5">
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
                    <label>Date Of Birth:</label>
                    <input value={post.dateOfBirth} type="date" className="form-control" onChange={handleInput} name="dateOfBirth"></input><br></br>
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
                <button className="btn btn-primary">Update</button><br></br>
            </form>
        </div>
    )
}
