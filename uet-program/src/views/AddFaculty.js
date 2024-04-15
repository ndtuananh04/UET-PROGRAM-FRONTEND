import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';


const URL = baseURL()  + '/faculties/new'

export default function AddFaculty() {
    
    const [post, setPost] = useState({
        "facultyName": "",
        "address": "",
        "email": "",
        "phone": "",
        "website": ""
    })
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    function handleSubmit(event) {
        event.preventDefault();
        // console.log(post)
        // axios.post(URL, post)
        // .then(response => console.log(response))
        // .catch(err => console.log(err))
        request(
            "POST",
            'faculties/new',
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
                <h1 className="text-center">Add Faculty</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Faculty Name:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="facultyName"></input><br></br>
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="address"></input><br></br>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="email"></input><br></br>
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="phone"></input><br></br>
                </div>
                <div>
                    <label>Website:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="website"></input><br></br>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
            
        </div>
    )
}
