import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { request, setAuthHeader } from '../helpers/axios_helper';

import Buttons from './Buttons';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import WelcomeContent from './WelcomeContent'
import Home from '../views/Home';

// export const getAccountName = () => {
//     return window.localStorage.getItem('account_name');
// };

// export const setAccountName = (token) => {
//     window.localStorage.setItem('account_name', token);
// };
export default class AppContent extends React.Component {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         componentToShow: "welcome"
    //     }
    // };
    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    };

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value});
    };

    // login = () => {
    //     this.setState({componentToShow: "login"})
    // };

    // logout = () => {
    //     // this.setState({componentToShow: "welcome"})
    //     // setAuthHeader(null);
    //     // window.location.reload();
    //     setAuthHeader(null);
    //     this.props.navigate('/'); 
    //     // window.location.reload();
    // };
    onSubmitLogin = (e) => {
        this.onLogin(e, this.state.login, this.state.password);
    };

    onLogin = (e, username, password) => {
        e.preventDefault();

        request(
            "POST",
            "/login",
            {
                login: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                console.log(response.data)
                const Name = response.data.lastName + " " + response.data.firstName ;
                window.localStorage.setItem('account_name', Name);
                this.props.navigate('/'); 
                // window.location.reload();
            }).catch(
            (error) => {
                setAuthHeader(null);
                // this.setState({componentToShow: "welcome"})
                alert('Username or Password is incorrect')
            }
        );
    };

    // onRegister = (event, firstName, lastName, username, password) => {
    //     event.preventDefault();
    //     request(
    //         "POST",
    //         "/register",
    //         {
    //             firstName: firstName,
    //             lastName: lastName,
    //             login: username,
    //             password: password
    //         }).then(
    //         (response) => {
    //             setAuthHeader(response.data.token);
    //             this.setState({componentToShow: "messages"});
    //         }).catch(
    //         (error) => {
    //             setAuthHeader(null);
    //             this.setState({componentToShow: "welcome"})
    //         }
    //     );
    // };

  render() {
    return (
        <div className='container pt-5'>
            {/* <Buttons
          login={this.login}
          logout={this.logout}
        /> */}
        <br />
        { <WelcomeContent /> }
        {/* {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />} */}
        <div className="row justify-content-center">
            <div className="col-4">
            {/* <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")} id="tab-login"
                  onClick={() => this.setState({active: "login"})}>Login</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} id="tab-register"
                  onClick={() => this.setState({active: "register"})}>Register</button>
              </li>
            </ul> */}

            <div className="tab-content">
              <div className="tab-pane show active" id="pills-login" >
                <form onSubmit={this.onSubmitLogin}>

                  <div className="form-outline mb-4">
                    <input type="login" id="loginName" name= "login" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="loginName">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                </form>
              </div>
              {/* <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                <form onSubmit={this.onSubmitRegister}>

                  <div className="form-outline mb-4">
                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="firstName">First name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="lastName">Last name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="login" name="login" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="login">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="registerPassword">Password</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
                </form>
              </div> */}
            </div>
            </div>
        </div>

        {/* {this.state.componentToShow === "messages" && <AuthContent />} */}
        </div>
    );
  };
}