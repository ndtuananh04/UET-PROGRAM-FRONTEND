import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { request, setAuthHeader } from '../helpers/axios_helper';


const URL = 'http://localhost:8080/myprogram/facultyprograms/new'

export default function AddFacultyProgram() {
   
    const [post, setPost] = useState({
        "facultyName": "",
        "programFullCode": ""
    })

    const [listFacultyName, setListFacultyName] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    
    useEffect(() => {
        // axios.get(URL)
        //     .then(response => {
        //     console.log(response.data)
        //     setListFacultyName(response.data.listOfFacultyName)
        //     setListProgramCode(response.data.listOfProgramFullCode)
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        'facultyprograms/new',
        {}).then(
        (response) => {
          console.log(response.data)
          setListFacultyName(response.data.listOfFacultyName)
            setListProgramCode(response.data.listOfProgramFullCode)
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

    function handleSubmit(event) {
        event.preventDefault();
        // axios.post(URL, post)
        //         .then(response => console.log(response))
        //         .catch(err => console.log(err));
        request(
        "POST",
        'facultyprograms/new',
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
                <h1 className="text-center">Add Falcuty-Program</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Faculty:</label>
                    <Select 
                        name="facultyName"
                        options={listFacultyName.map(tt=>({value: tt, label: tt}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, facultyName: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Program Full Code:</label>
                    <Select 
                        name="programFullCode"
                        options={listProgramCode.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, programFullCode: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                
            
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
