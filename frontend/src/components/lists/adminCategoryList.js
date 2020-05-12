import React from "react";
import axios from 'axios';
class List extends React.Component
{
    constructor(props) {
        super(props);

        this.state = (
            {
                typingCatName : '',
                placeholder :''
            });

        const id = this.props.id;
        this.getCategoryFromAPI(id);
    }

    render() {

        const id = this.props.id;

        return(

           <div>
                {this.state.placeholder !== '' &&
                    <div className="card  mt-2 border border-primary">
                        <div className="card-body">
                            <div className="input-group">

                                <input
                                        type="text"
                                       placeholder={this.state.placeholder}
                                       value={this.state.typingCatName}
                                       className="form-control p-1"
                                       onChange={(e)=> this.HandleOnKeyPressed(e.target.value)}
                                       aria-label="Recipient's username" aria-describedby="basic-addon2"/>

                                <div className="input-group-append">
                                    <button type="button" className="btn btn-primary p-1" onClick={() => this.update(id)}>Update</button>
                                    <button type="button" className="btn btn-primary pr-2 pl-2 ml-1" onClick={() => this.delete(id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    HandleOnKeyPressed = (value) => {

        this.setState({typingCatName : value});
    };
    update = (id) => {

        axios.post("http://localhost:5000/api/category/update", {
            id: id,
            catName : this.state.typingCatName
        })
            .then(res => {
                if(res.status === 200)
                {
                    this.getCategoryFromAPI(this.props.id);
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
                    this.setState({placeholder : ''});
                }
            })
            .catch(error => {alert((error))});
    };
    getCategoryFromAPI = (id) => {

        axios.get("http://localhost:5000/api/category/find?id=" + id)
            .then(res => {
                if(res.status === 200)
                {
                     var list = res.data;
                     list.map(item => {

                        this.setState({placeholder : item.catName});
                     });

                }
            })
            .catch(error => {alert((error))});

    };

}
export default List;