import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';


const URL = baseURL()  + '/classrooms/new'

export default function AddClassroom() {
    
    const [post, setPost] = useState({
        "cohort": "",
        "nameClass": ""
    })
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(post)
        // axios.post(URL, post)
        // .then(response => console.log(response))
        // .catch(err => console.log(err))
        request(
            "POST",
            'classrooms/new',
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
        <div className='container pt-5'>
            <br></br>
            <div>
                <h1 className="text-center">Add Classroom</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Cohort:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="cohort"></input><br></br>
                </div>
                <div className="form-group"> 
                    <label>Class Name:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="nameClass"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}


