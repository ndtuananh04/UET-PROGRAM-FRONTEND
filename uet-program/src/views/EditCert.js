import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';


export default function EditCert() {
   
    const [post, setPost] = useState({
        "studentId": "",
        "certificateType": "",
        "levelLanguage": "",
        "submissionDate": ""
    })

    const {id} = useParams();
    const {id2} = useParams();
    const [certTypeList, setCertTypeList] = useState([])
    const [levelList, setLevelList] = useState([])
    
    useEffect(() => {
        // axios.get(`http://localhost:8080/myprogram/obtaincerts/edit/${id}`)
        //     .then(response => {
        //     console.log(response.data)
        //     setCertTypeList(response.data.certificateTypeList)
        //     setLevelList(response.data.levelLanguageList)
        //     setPost({...post, studentId: response.data.studentId, certificateType: response.data.certificateType,
        //     levelLanguage: response.data.levelLanguage, submissionDate: response.data.submissionDate})
        //     })
        //     .catch(error => console.log(error));
        request(
        "GET",
        `obtaincerts/edit/${id}/${id2}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setCertTypeList(response.data.certificateTypeList)
            setLevelList(response.data.levelLanguageList)
            setPost({...post, studentId: response.data.studentId, certificateType: response.data.certificateType,
            levelLanguage: response.data.levelLanguage, submissionDate: response.data.submissionDate})
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
        axios.put(baseURL()  + '/obtaincerts/edit/save', post)
                .then(response => console.log(response))
                .catch(err => console.log(err));
        request(
        "PUT",
        'obtaincerts/edit/save',
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
                <h1 className="text-center">Edit Certificate</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Student ID:</label>
                    <input value={post.studentId} type="text" className="form-control" name="studentId"></input><br></br>
                </div>
                <div className="form-group">
                    <label>Certificate Type:</label>
                    <Select 
                        name="certificateType"
                        options={certTypeList.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, certificateType: e.value})}
                        className="form-control"
                        value={{ label: post.certificateType, value: post.certificateType}}
                    >
                    </Select><br></br>
                </div>
                <div className="form-group">
                    <label>Language Level:</label>
                    <Select 
                        name="levelLanguage"
                        options={levelList.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        onChange={e => setPost({...post, levelLanguage: e.value})}
                        className="form-control"
                        value={{ label: post.levelLanguage, value: post.levelLanguage}}
                    >
                    </Select>
                </div>
                <div className="form-group">
                    <label>Submission Date:</label> 
                    <input value={post.submissionDate} type="date" className="form-control" onChange={handleInput} name="submissionDate"></input><br></br>
                </div>
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
            <br></br>

        </div>
    )
}
