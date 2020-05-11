import React from "react";
import css from '../../css/Login.css';
import axios from "axios";
import loginImage from '../../images/login_image.png';

class App extends React.Component
{
    render() {
        return(
            <div className="registerContainer">
                <div className="inputFieldContainer">
                    <img className="img-fluid mx-auto d-block loginImage" src={loginImage}/>
                    <input type="file" id="file-input" className="btn btn-primary mt-2 mx-auto d-block w-25" onChange={(e) => this.imageSelected(e.target.files[0])}/>
                    {/*<input className="btn btn-primary mt-2 mx-auto d-block w-25" type="button" value="Pick Image"/>*/}
                    <input className="form-control  mx-auto d-block mt-4 w-75 p-4" aria-label="Default" type="text" placeholder="Username"/>
                    <input className="form-control  mx-auto d-block mt-2 w-75 p-4" aria-label="Default" type="text" placeholder="Email"/>
                    <input className="form-control  mx-auto d-block mt-2 w-75 p-4" aria-label="Default" type="password" placeholder="Password"/>
                    <input className="btn btn-primary mt-2 mx-auto  mt-4 d-block w-75" type="button" value="Register as user"/>
                    <input className="btn btn-primary mt-2 mx-auto d-block w-75" type="button" value="Register as admin"/>
                    <input className="btn btn-primary mt-2 mx-auto d-block w-75" type="button" value="Register as store manager"/>
                </div>
            </div>
        )
    }
    imageSelected = (image) => {

        console.log(image);
    }
}
export default App;