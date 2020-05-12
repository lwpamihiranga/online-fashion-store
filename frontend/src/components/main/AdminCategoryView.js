import React from "react";
import axios from 'axios';

import AdminCatItem from '../lists/adminCategoryList';

class AdminCategoryView extends React.Component
{
    constructor(props) {
        super(props);
        this.state = (
            {
                catList : [],
                typingCatName : ''
            });

        this.getAllCategories();
    }
    render() {

        const list = this.state.catList.map(item => {
            return(
                <div key={item._id}>
                    <AdminCatItem id={item._id}/>
                </div>
            )
        });


        return(
            <div className="container-fluid w-100 mt-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control  p-4" placeholder="Category Name" value={this.state.typingCatName} onChange={(e) => this.OnKeyPressed(e.target.value)}
                           aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-primary" onClick={() => this.OnSubmit()}>Create New</button>
                        </div>
                </div>
              {list}
          </div>
        )
    }
    getAllCategories()
    {
        axios.get('http://localhost:5000/api/category')
            .then(response => {

                if(response.status === 200)
                {
                    var list = response.data;
                    list.reverse();
                    this.setState({catList : list,typingCatName :''});
                }

            })
            .catch(error => {

            })
    }
    OnKeyPressed = (value) => {

        this.setState({typingCatName : value});
    };
    OnSubmit = () => {

        if(this.state.typingCatName === '')
        {
            alert('Enter a valid category Name');
        }
        else
        {
            axios.post("http://localhost:5000/api/category",{catName : this.state.typingCatName})
                .then(response => {
                    if(response.status === 200)
                    {
                        this.getAllCategories();
                    }
                    else if(response.status === 201)
                    {
                        alert("A Category already exists with the specified name!");
                    }
                    else
                    {
                        alert("Something went wrong!");
                    }


                })
                .catch(error => {

                });
            this.getAllCategories();
        }
    }
}
export default AdminCategoryView;