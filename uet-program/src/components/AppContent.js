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
    
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome"
        }
    };

    login = () => {
        this.setState({componentToShow: "login"})
    };

    logout = () => {
        this.setState({componentToShow: "welcome"})
        setAuthHeader(null);
        window.location.reload();
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
                const Role = response.data.role;
                window.localStorage.setItem('role_type', Role);
                this.props.navigate('/'); 
                window.location.reload();
            }).catch(
            (error) => {
                // setAuthHeader(null);
                // this.setState({componentToShow: "welcome"})
                alert('Username or Password is incorrect')
            }
        );
    };

    onRegister = (event, firstName, lastName, username, password) => {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({componentToShow: "messages"});
            }).catch(
            (error) => {
                // setAuthHeader(null);
                this.setState({componentToShow: "welcome"})
            }
        );
    };

  render() {
    return (
        <div className='container pt-5'>
            <Buttons
          login={this.login}
          logout={this.logout}
        />

        {this.state.componentToShow === "welcome" && <WelcomeContent /> }
        {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
        {this.state.componentToShow === "messages" && <AuthContent />}
        </div>
    );
  };
}