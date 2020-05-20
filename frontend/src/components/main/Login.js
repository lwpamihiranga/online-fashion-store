import React from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import Roles from '../../_helpers/role';

import loginImage from '../../images/login_image.png';
import '../../css/Login.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { username: '', password: '' };
        this.handleUsername = this.handleUsername.bind();
        this.handlePassword = this.handlePassword.bind();
    }

    render() {
        return (
            <div className="loginContainer">
                <div className="inputFieldContainer mt-5">
                    <img className="img-fluid mx-auto d-block loginImage" src={loginImage} />
                    <input
                        className="form-control  mx-auto d-block mt-4 w-75 p-4"
                        aria-label="Default"
                        type="text"
                        value={this.state.username}
                        onChange={(e) => this.setState({ username: e.target.value })}
                        placeholder="Username"
                    />
                    <input
                        className="form-control  mx-auto d-block mt-2 w-75 p-4"
                        aria-label="Default"
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        placeholder="Password"
                    />
                    <input
                        className="btn btn-primary mt-4 mx-auto d-block w-75"
                        type="button"
                        value="Login"
                        onClick={() => this.checkLogin(this.state.username, this.state.password, Roles.User)}
                    />
                </div>
            </div>
        );
    }

    handleUsername(e) {
        //alert("called");
    }

    handlePassword(e) {}

    checkLogin(email, password, type) {
        if (email === '' || password === '' || type === '') {
            alert('Enter details Properly');
            return;
        }

        const bodyObj = {
            email,
            password,
        };

        axios
            .post('http://localhost:5000/api/users/login', bodyObj)
            .then((response) => {
                if (response.status === 200) {
                    const token = response.data.token;
                    if (token !== null) {
                        localStorage.setItem('token', token);
                    }
                    const user = jwt.verify(token, 'secret');
                    this.saveUser(user);
                } else {
                    alert('Login failed');
                }
            })
            .catch((err) => {
                alert('Login failed');
            });
    }

    saveUser(userObject) {
        localStorage.setItem('userName', userObject.name);
        localStorage.setItem('userPassword', 'fool');
        localStorage.setItem('userType', userObject.type);
        localStorage.setItem('userId', userObject.userId);
        localStorage.setItem('userImageLink', userObject.imageLink);
        localStorage.setItem('userEmail', userObject.email);

        window.location.href = 'http://localhost:3000/';
    }
}
export default App;
