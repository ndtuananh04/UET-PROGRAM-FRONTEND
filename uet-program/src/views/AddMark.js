import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { request, setAuthHeader } from '../helpers/axios_helper';

const URL = 'http://localhost:8080/myprogram/marksubjects/new'

export default function AddMark() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "subjectId": "",
        "mark": 0
    })

    const [listStudentId, setListStudentId] = useState([])
    const [listSubjectId, setListSubjectId] = useState([])
    
    useEffect(() => {
        // axios.get(URL)
        //     .then(response => {
        //     console.log(response.data)
        //     setListStudentId(response.data.listOfStudentId)
        //     setListSubjectId(response.data.listOfSubjectId)
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        'marksubjects/new',
        {}).then(
        (response) => {
          console.log(response.data)
          setListStudentId(response.data.listOfStudentId)
            setListSubjectId(response.data.listOfSubjectId)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
    },[]);

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(post)
        // axios.post(URL, post)
        //         .then(response => console.log(response))
        //         .catch(err => console.log(err));
        request(
        "POST",
        'marksubjects/new',
        post).then(
        (response) => {
          console.log(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
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
                <h1 className="text-center">Add Mark</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student ID:</label>
                    <Select 
                        name="studentId"
                        options={listStudentId.map(tt=>({value: tt, label: tt}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, studentId: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Subject ID:</label>
                    <Select 
                        name="subjectId"
                        options={listSubjectId.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, subjectId: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Mark:</label> 
                    <input type="number" step="0.1" className="form-control" onChange={handleInput} name="mark"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
