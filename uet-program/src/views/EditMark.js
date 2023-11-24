import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';

export default function EditMark() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "subjectId": "",
        "mark": 0
    })

    const {id} = useParams();
    const [listStudentId, setListStudentId] = useState([])
    const [listSubjectId, setListSubjectId] = useState([])
    
    useEffect(() => {
        // axios.get(`http://localhost:8080/myprogram/marksubjects/edit/${id}`)
        //     .then(response => {
        //     console.log(response.data)
        //     setListStudentId(response.data.listOfStudentId)
        //     setListSubjectId(response.data.listOfSubjectId)
        //     setPost({...post, studentId: response.data.studentId, subjectId: response.data.subjectId,
        //         mark: response.data.mark})
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        `marksubjects/edit/${id}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setListStudentId(response.data.listOfStudentId)
            setListSubjectId(response.data.listOfSubjectId)
            setPost({...post, studentId: response.data.studentId, subjectId: response.data.subjectId,
                mark: response.data.mark})
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
        // axios.put('http://localhost:8080/myprogram/marksubjects/edit/save', post)
        //         .then(response => console.log(response))
        //         .catch(err => console.log(err));
        request(
        "PUT",
        'marksubjects/edit/save',
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
                <h1 className="text-center">Edit Mark</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student ID:</label> 
                    <input value={post.studentId} type="text" className="form-control" name="studentId"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Subject ID:</label> 
                    <input value={post.subjectId} type="text" className="form-control" name="subjectId"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Mark:</label> 
                    <input value={post.mark} type="number" className="form-control" onChange={handleInput} name="mark"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
