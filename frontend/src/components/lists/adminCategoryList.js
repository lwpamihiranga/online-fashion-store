import React from "react";
import axios from 'axios';
class List extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({ typingCatName : '',isDeleted : false,isUpdated : false,placeholder :this.props.catName});
    }

    render() {

        const id = this.props.id;
        // var catName = this.props.catName;
        //
        //
        // if(this.state.isUpdated)
        // {
        //     catName = this.state.typingCatName;
        // }


        return(

           <div>
                {!this.state.isDeleted &&
                    <div className="card  mt-1">
                        <div className="card-body">
                            <div className="input-group">
                                <input type="text" placeholder={this.props.catName} value={this.state.typingCatName} className="form-control  p-4" onChange={(e)=> this.HandleOnKeyPressed(e.target.value)}
                                       aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-primary p-2" onClick={() => this.update(id)}>Update</button>
                                    <button type="button" className="btn btn-primary p-2 ml-1" onClick={() => this.delete(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    HandleOnKeyPressed = (value) => {

        this.setState({typingCatName : value,isUpdated : false,isDeleted : false});
    };
    update = (id) => {

        axios.post("http://localhost:5000/api/category/update", {
            id: id,
            catName : this.state.typingCatName
        })
            .then(res => {
                if(res.status === 200)
                {
                    this.setState({isUpdated : true,placeholder : this.state.typingCatName});
                }
            })
            .catch(error => {alert((error))});
    };
    delete = (id) => {

        axios.post("http://localhost:5000/api/category/delete", {
            id: id
        })
            .then(res => {
                if(res.status === 200)
                {
                    this.setState({isDeleted : true});
                }
            })
            .catch(error => {alert((error))});
    }

}
export default List;