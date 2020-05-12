import React from "react";
import css from '../../css/StoreManager.css';
import loginImage from "../../images/login_image.png";

class ManagerView extends React.Component
{
    render() {
        return(
            <div className='container-fluid mt-4'>

                <div className="p-5">
                    <div className="form-group">
                        <img className="img-fluid mx-auto d-block loginImage" src={loginImage}/>
                        <input type="file" id="file-input" className="btn btn-primary mt-2 mx-auto d-block" name="imageLink" onChange={(e) => this.setState({imageLink : e.target.files[0]})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Product Name:</label>
                        <input type="text" className="form-control" id="usr"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Price:</label>
                        <input type="text" className="form-control" id="pwd"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Discount:</label>
                        <input type="text" className="form-control" id="pwd"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"/>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Submit" className="btn btn-primary mt-2 mx-auto d-block w-100"/>
                    </div>
                </div>


            </div>
        )
    }
}
export default ManagerView;