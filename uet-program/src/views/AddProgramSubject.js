import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';


const URL = baseURL()  +'/programsubjects/new'

export default function AddProgramSubject() {
   
    const [post, setPost] = useState({
        "programFullCode": "",
        "subjectId": "",
        "roleType": ""
    })

    const [listSubjectId, setListSubjectId] = useState([])
    const [listProgramCode, setListProgramCode] = useState([])
    const [listRoleType, setListRoleType] = useState([]);
    
    const getProgramSubjectInfo = (e) => {
        // e.preventDefault()
        // axios.get(URL)
        //     .then(response => {
        //     console.log(response.data)
        //     setListSubjectId(response.data.listOfSubjectId)
        //     setListProgramCode(response.data.listOfProgramFullCode)
        //     setListRoleType(response.data.listRoleType)
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        'programsubjects/new',
        {}).then(
        (response) => {
          console.log(response.data)
          setListSubjectId(response.data.listOfSubjectId)
            setListProgramCode(response.data.listOfProgramFullCode)
            setListRoleType(response.data.listRoleType)
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

    function handleSubmit(event) {
        event.preventDefault();
        // axios.post(URL, post)
        //         .then(response => console.log(response))
        //         .catch(err => console.log(err));
        request(
        "POST",
        'programsubjects/new',
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
            {
              listProgramCode.length < 1 ? getProgramSubjectInfo() : ''
            }
            <br></br>
            <div>
                <h1 className="text-center">Add Program-Subject</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Faculty:</label>
                    <Select 
                        name="programFullCode"
                        options={listProgramCode.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, programFullCode: e.value})}
                        className="form-control"
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Program Full Code:</label>
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
                    <label>Role Type:</label>
                    <Select 
                        name="roleType"
                        options={listRoleType.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, roleType: e.value})}
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
