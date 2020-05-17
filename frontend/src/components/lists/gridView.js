import React from "react";
import css from '../../css/gridView.css';
import {Link} from "react-router-dom";

class Grid extends React.Component
{
    render() {

        const rows = this.props.productList.map(product => {

            const url = require('../../uploads/products/' + product.imageLink);

            var discount = 10;
            if(product.discount !== '' && product.discount > 0)
            {
                discount = (product.discount / product.price) * 100;
            }


            return (
                <div className='col-md-3 col-sm-6 col-xs-6 mb-4' key={product._id}>

                    <div className="card">
                        <div className="card-body">
                            {console.log(url)}
                            <div key={product._id}
                                 className="row d-flex justify-content-center">

                                <img src={url}
                                     alt="..."
                                     className="img-responsive p-1 productImg"/>
                            </div>
                            <strong>
                                <p className="font-weight-bold">
                                    {product.name}
                                </p>
                            </strong>
                            {
                                product.discount !== '' && product.discount > 0
                                &&
                                <strong>
                                    <p className="font-weight-bold">
                                        {~~discount + '% OFF  |  '}
                                        <strike>{'LKR ' + product.price + '/='}</strike>
                                    </p>
                                </strong>
                            }
                            {
                                product.discount === '' || product.discount <= 0
                                &&
                                <strong>
                                    <p className="font-weight-bold">
                                        {'LKR ' + product.price + '/='}
                                    </p>
                                </strong>
                            }


                            <Link to={'/product/' + product._id} style={{ textDecoration: 'none' }}>
                                <input type="button" className="btn btn-primary mt-2 mx-auto d-block w-100" value="View"/>
                            </Link>
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
}
export default Grid;