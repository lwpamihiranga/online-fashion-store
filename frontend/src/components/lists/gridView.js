import React from "react";
import css from '../../css/gridView.css';
import {Link} from "react-router-dom";
import axios from "axios";

const LoginState = require('../../_helpers/loginState');

class Grid extends React.Component
{

    constructor(props) {
        super(props);
    }

    render() {


        const isCategory = this.props.isCategory;
        const isWishList = this.props.isWishList;
        const isCartList = this.props.isCartList;

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

                            {
                                isCategory &&
                                <Link to={'/product/' + product._id} style={{ textDecoration: 'none' }}>
                                    <input type="button" className="btn btn-primary mt-2 mx-auto d-block w-100" value="View"/>
                                </Link>
                            }
                            {
                                isWishList &&
                                    <div>
                                        <input className="btn btn-primary mt-2 mx-auto d-block w-100" type="button"  value="Add to Cart" onClick={() => this.addToCart(LoginState.getUserId(),product._id)}/>
                                        <input className="btn btn-primary mt-2 mx-auto d-block w-100" type="button"  value="Remove" onClick={() => this.removeProductFromWishList(LoginState.getUserId(),product._id)}/>
                                    </div>
                            }
                            {
                                isCartList &&
                                    <div>
                                        <input
                                            className="btn btn-primary mt-2 mx-auto d-block w-100"
                                            type="button"
                                            value="Buy"
                                            onClick={() => this.buyProduct(LoginState.getUserId(), product._id)}
                                        />
                                        <input
                                            className="btn btn-primary mt-2 mx-auto d-block w-100"
                                            type="button"
                                            value="Remove"
                                            onClick={() => this.removeProductFromCart(LoginState.getUserId(), product._id)}
                                        />
                                    </div>
                            }

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
    removeProductFromWishList = (userId,productId) => {

        axios.post("http://localhost:5000/api/wishList/delete?userId=" + userId + "&productId=" + productId)
            .then(response => {
                if(response.status === 200)
                {
                    this.props.getWishListFromServer(userId);
                }
            })
            .catch(error => console.log(error));
    };
    addToCart = (userId,productId) => {

        if(productId != null && userId != null)
        {
            axios.post("http://localhost:5000/api/cart/create?productId=" + productId +"&userId=" + userId)
                .then(response => {
                    if (response.status === 200)
                    {
                        var list = response.data;
                        if(list.length === 0)
                        {
                            alert("This product has already added to your cart");
                        }
                        else
                        {
                            alert("Successfully added to the cart!");
                        }
                    }
                })
                .catch(error => console.log(error));
        }
        else
        {
            if(productId == null)
            {
                alert("ProductId is null");
            }
            if(userId == null)
            {
                alert("Login to the system!");
            }
        }


    };
    removeProductFromCart = (userId, productId) => {
        axios
            .post('http://localhost:5000/api/cart/delete?userId=' + userId + '&productId=' + productId)
            .then((response) => {
                if (response.status === 200)
                {
                  this.props.getCartListFromServer(userId);
                }
            })
            .catch((error) => console.log('Remove product from cart post error: ', error));
    };
}
export default Grid;