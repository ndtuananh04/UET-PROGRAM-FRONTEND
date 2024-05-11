import React, { useState, useEffect } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import {baseURL} from '../constant/config';
import Select from "react-select";

export default function AccountCreate() {
    const [formData, setFormData] = useState({
      "firstName": "",
      "lastName": "",
      "login": "",
      "password" : "",
      "roles": []
    });
    const [role, setRole] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        request(
          "POST",
          'register',
          formData).then(
          (response) => {
            console.log(response.data)
            alert("Register Success")
          }).catch(
          (error) => {
              if (error.response.status === 401) {
                  // setAuthHeader(null);
              } else {
                  this.setState({data: error.response.code})
              }
          }
        );
        console.log(formData);
    };

    useEffect(()=> {
      // axios.get(URL)
      //     .then(response => {
      //     setStudentGender(response.data.listOfGender)
      //     setStudentClass(response.data.listOfClassroom)
      //     })
      //     .catch(error => console.log(error));
      request(
      "GET",
      'listauthorizedroles',
      {}).then(
      (response) => {
        console.log(response.data)
          setRole(response.data)
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

      

    return (
        // <div>
        //     <h2>Create Account</h2>
        //     <form onSubmit={handleSubmit}>
        //         <label htmlFor="firstName">First Name:</label><br />
        //         <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required /><br />

        //         <label htmlFor="lastName">Last Name:</label><br />
        //         <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required /><br />

        //         <label htmlFor="loginName">Login Name:</label><br />
        //         <input type="text" id="loginName" name="loginName" value={formData.loginName} onChange={handleChange} required /><br />

        //         <label htmlFor="password">Password:</label><br />
        //         <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br />

        //         <label htmlFor="permission">Permission:</label><br />
        //         <select id="permission" name="permission" value={formData.permission} onChange={handleChange} required>
        //             <option value="">Select Permission</option>
        //             <option value="user">User</option>
        //             <option value="admin">Admin</option>
        //         </select><br />
        //         <button type="submit">Create Account</button>
                
        //     </form>
            
        // </div>
        <div className='container pt-5'>
         <div className="row justify-content-center">
         <div className=" col-6 tab-content">
         <div className="tab-pane show active" id="pills-login" >
           <form onSubmit={handleSubmit}>
              <br />
              <h1 class= "text-center" >Create Account</h1>
              <br />
             <div className="form-outline mb-4">
               <input type="text" id="lastName" name= "lastName" className="form-control" onChange={handleChange}/>
               <label className="form-label" htmlFor="lastName">Last Name</label>
             </div>

             <div className="form-outline mb-4">
               <input type="text" id="firstName" name= "firstName" className="form-control" onChange={handleChange}/>
               <label className="form-label" htmlFor="firstName">First Name</label>
             </div>

             <div className="form-outline mb-4">
               <input type="text" id="loginName" name= "login" className="form-control" onChange={handleChange}/>
               <label className="form-label" htmlFor="loginName">Username</label>
             </div>

             <div className="form-outline mb-4">
               <input type="password" id="loginPassword" name="password" className="form-control" onChange={handleChange}/>
               <label className="form-label" htmlFor="loginPassword">Password</label>
             </div>

             <div className="form-group">
                    <label>Role:</label>
                    <Select 
                        name="role"
                        options={role.map(t=>({value: t, label: t}))}
                        placeholder='None Selected'
                        isMulti
                        onChange={e => setFormData({...formData, roles: e.map(obj => obj.value)})}
                        className="form-control"
                        value={formData.roles.map(t=>({value: t, label: t}))}
                    >
                    </Select>
                    <br />
                </div>

             <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

           </form>
         </div>
         </div>
         </div>
        </div>
    );
}

