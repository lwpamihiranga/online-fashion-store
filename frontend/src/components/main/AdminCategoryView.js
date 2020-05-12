import React from "react";
import axios from 'axios';

class AdminCategoryView extends React.Component
{
    constructor(props) {
        super(props);
        this.state = ({catList : []});
        this.getAllCategories();
    }
    render() {

        const list = this.state.catList.map(item => {

            return(
                <div>
                    <div className="card  mt-1">
                        <div className="card-body">
                           <input type='text' placeholder={item.catName} className="w-100 p-2" onChange={(e)=> this.Handle(e.target.value)}/>
                            <button type="button" className="btn btn-primary p-2 mt-3">Update</button>
                            <button type="button" className="btn btn-primary p-2 mt-3 ml-2">Delete</button>
                        </div>
                    </div>
                </div>
            )
        });


        return(
            <div className="container-fluid w-100 mt-5">
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
                    this.setState({catList : list});
                }

            })
            .catch(error => {

            })
    }
}
export default AdminCategoryView;