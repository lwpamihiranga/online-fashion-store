import React from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import {Dropdown,DropdownButton} from "react-bootstrap";
import css from '../../css/gridView.css';

class Grid extends React.Component
{
    constructor(props) {
        super(props);

        this.state = (
            {
                productList : []
            });
        //this.getAllProducts();
    }

    render() {


        const rows = this.props.productList.map(product => {

            const url = require('../../uploads/products/' + product.imageLink);

            return (
                <div className='col-md-3 col-sm-6 col-xs-6' key={product._id}>

                    <div className="card">
                        <div className="card-body">
                            {console.log(url)}
                            <div key={product._id}
                                 className="row d-flex justify-content-center">
                                <img src={url}
                                     alt="..."
                                     className="img-responsive w-100 h-100 p-1"/>
                                <strong>
                                    <p
                                        className="font-weight-bold">
                                        {product.name}
                                    </p>
                                </strong>
                            </div>

                        </div>
                    </div>

                </div>
            )
        });

        return (
            <div>

                <div className="row mt-1">
                    {rows}
                </div>
            </div>

        )

    }
    // getAllProducts = () => {
    //
    //     axios.get('http://localhost:5000/api/products')
    //         .then(response => {
    //
    //             if(response.status === 200)
    //             {
    //                 const list = response.data;
    //                 this.setState({productList : response.data});
    //             }
    //
    //         })
    //         .catch(error => {
    //
    //             alert(error);
    //         })
    //
    // };
    // getAllCategories = () => {
    //
    //     axios.get('http://localhost:5000/api/category')
    //         .then(response => {
    //
    //             if(response.status === 200)
    //             {
    //                 this.setState({categoryList : response.data})
    //             }
    //
    //         })
    //         .catch(error => {
    //
    //         });
    // };
}
export default Grid;