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
        this.getAllProducts();
    }

    render() {


        const rows = this.state.productList.map(product => {

            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(product.image.data.data);
            var link = base64Flag + imageStr;

            return (
                <div className='col-md-3 col-sm-6 col-xs-6' key={product._id}>

                    <div className="card">
                        <div className="card-body">

                            <div key={product._id}
                                 className="row d-flex justify-content-center">
                                <img src={link}
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
    getAllProducts = () => {

        axios.get('http://localhost:5000/api/products')
            .then(response => {

                if(response.status === 200)
                {
                    const list = response.data;
                    this.setState({productList : response.data});
                }

            })
            .catch(error => {

                alert(error);
            })

    };
    arrayBufferToBase64(buffer)
    {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
}
export default Grid;