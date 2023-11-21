import axios from 'axios';
import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function SendMail() {
    const [mail, setMail] = useState({
        "to": "",
        "subject": "",
        "text": "",
    });

    const handleInput = (event) => {
        setMail({...mail, [event.target.name]: event.target.value})
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log(mail)
        axios.post('http://localhost:8080/myprogram/mail/send/save', mail)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    return (
        <div className="container pt-5">
             <br></br>
            <div>
                <h1 className="text-center">Send Email</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Send to:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="to"></input><br></br>
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="subject"></input><br></br>
                </div>
                <div>
                    <label>Content:</label>
                    <input type="text" className="form-control" onChange={handleInput} name="text"></input><br></br>
                </div>
                <button className="btn btn-primary">Send</button>
            </form>
        </div>
    )
}