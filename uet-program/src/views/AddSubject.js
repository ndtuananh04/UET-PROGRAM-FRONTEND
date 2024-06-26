import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';


const URL = baseURL()  + '/subjects/new'

export default function AddSubject() {
   
    const [post, setPost] = useState({
        "subjectid": "",
        "subjectName": "",
        "credit": 0,
        "prerequisiteSubjectId": []
    })

    const [subjectList, setSubjectList] = useState([])
    
    useEffect(() => {
        // axios.get(URL)
        //     .then(response => {
        //     console.log(response.data.listOfSubjectId)
        //     setSubjectList(response.data.listOfSubjectId)
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        'subjects/new',
        {}).then(
        (response) => {
          console.log(response.data)
          setSubjectList(response.data.listOfSubjectId)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
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
        // axios.post(URL, post)
        //         .then(response => console.log(response))
        //         .catch(err => console.log(err));
        request(
        "POST",
        'subjects/new',
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


