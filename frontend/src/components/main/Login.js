import React from 'react';
import css from '../../css/Login.css';
import axios from "axios";

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state=({username : "",password : ""});
        this.handleUsername = this.handleUsername.bind();
        this.handlePassword = this.handlePassword.bind();
    }

    render() {
        return(
            <div className="loginContainer">
                <div className="inputFieldContainer">
                    <input className="textInput" type="text" value={this.state.username}  onChange={(e)=> this.setState({username:e.target.value})} placeholder="Username"/>
                    <input className="textInput" type="password" value={this.state.password} onChange={(e)=> this.setState({password:e.target.value})} placeholder="Password"/>
                    <input className="buttons" type="button" value="Login as user" onClick={() => this.checkLogin(this.state.username,this.state.password,"user")}/>
                    <input className="buttons"  type="button" value="Login as admin" onClick={() => this.checkLogin(this.state.username,this.state.password,"admin")}/>
                    <input className="buttons"  type="button" value="Login as store manager" onClick={() => this.checkLogin(this.state.username,this.state.password,"manager")}/>
                </div>
            </div>
        )
    }
    handleUsername(e)
    {
        //alert("called");

    }
    handlePassword(e)
    {

    }
    checkLogin(email,password,type)
    {
        if(email === "" || password === "" || type === "")
        {
            alert("Enter details Properly");
            return;
        }
        axios.get("http://localhost:5000/api/users/login?email=" + email + "&password=" + password + "&type=" +type)
            .then(response => {
                if(response.status === 200)
                {
                    var list = [];
                    list = response.data;

                    var userObject;
                    list.map(user =>{
                        userObject = user;
                    });
                    if(list.length > 0)
                    {
                        this.saveUser(userObject);


                    }
                    else {
                        alert("Login failed");
                    }
                }
            })
            .catch(error => console.log(error));
    }
    saveUser(userObject)
    {
        localStorage.setItem('userName', userObject.name);
        localStorage.setItem('userPassword', userObject.password);
        localStorage.setItem('userType', userObject.type);
        localStorage.setItem('userId', userObject._id)
        localStorage.setItem('userImageLink', userObject.imageLink);
        localStorage.setItem('userEmail', userObject.email);

        // var user = localStorage.getItem('user');

        window.location.href = "http://localhost:3000/";
    }
}
export default App;