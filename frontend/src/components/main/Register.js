import React from "react";
import css from '../../css/Login.css';
import axios from "axios";
import loginImage from '../../images/login_image.png';

class App extends React.Component
{

    constructor(props) {
        super(props);

        this.state = (
            {
                email : '',
                username :'',
                password : '',
                imageLink : ''
        });
    }

    render() {
        return(
            <div className="registerContainer">
                <div className="inputFieldContainer">



                    <img className="img-fluid mx-auto d-block loginImage" src={loginImage}/>
                    <input type="file" id="file-input" className="btn btn-primary mt-2 mx-auto d-block w-25" name="imageLink" onChange={(e) => this.setState({imageLink : e.target.files[0]})}/>
                    <input className="form-control  mx-auto d-block mt-4 w-75 p-4" aria-label="Default" type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                    <input className="form-control  mx-auto d-block mt-2 w-75 p-4" aria-label="Default" type="text" placeholder="Email" value={this.state.email}  onChange={(e) => this.setState({email: e.target.value})}/>
                    <input className="form-control  mx-auto d-block mt-2 w-75 p-4" aria-label="Default" type="password" placeholder="Password" value={this.state.password}  onChange={(e) => this.setState({password: e.target.value})}/>
                    <input className="btn btn-primary mt-2 mx-auto  mt-4 d-block w-75" type="button" value="Register as user" onClick={() => this.register("user")}/>
                    <input className="btn btn-primary mt-2 mx-auto d-block w-75" type="button" value="Register as admin" onClick={() => this.register("admin")}/>
                    <input className="btn btn-primary mt-2 mx-auto d-block w-75" type="button" value="Register as store manager" onClick={() => this.register("store")}/>
                </div>
            </div>
        )
    }
    register = (type) => {

        var formdata = new FormData();
        formdata.append('imageLink', this.state.imageLink);
        formdata.append('name',this.state.username);
        formdata.append('type',type);
        formdata.append('email',this.state.email);
        formdata.append('password',this.state.password);


        axios.post('http://localhost:5000/api/users/register',formdata)
        .then(res =>
        {
                if(res.status === 201)
                {
                    alert("Successfully Registered!");
                }
            }).catch(error => {
                alert(error);
        })
    }
}
export default App;