import React from "react";
import css from '../../css/gridView.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {Nav, NavDropdown} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown,faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const LoginState = require('../../_helpers/loginState');
const BuyMethod = require('../../_helpers/Buy');

class Grid extends React.Component
{

    constructor(props) {
        super(props);
    }

    render() {


        const isCategory = this.props.isCategory;
        const isWishList = this.props.isWishList;
        const isCartList = this.props.isCartList;
        const isStoreMangerGridView = this.props.isStoreMangerGridView;

        const rows = this.props.productList.map((product,index) => {

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
                                        <button  className="btn btn-primary mt-2 mx-auto d-block w-100">
                                            <NavDropdown
                                                title={
                                                    <strong className="dropDownTitle ml-1"> <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />Buy</strong>
                                                }>
                                                   <button
                                                       className="dropDownButton"
                                                       onClick={() => this.buyProduct(product._id,BuyMethod.Card)}>
                                                           <NavDropdown.Item>
                                                               {'Card'}
                                                           </NavDropdown.Item>
                                                           <NavDropdown.Divider />
                                                   </button>
                                                <button
                                                    className="dropDownButton"
                                                    onClick={() => this.buyProduct(product._id,BuyMethod.CashOnDelivery)}>
                                                        <NavDropdown.Item>
                                                            {'Cash on Delivery'}
                                                        </NavDropdown.Item>
                                                </button>

                                            </NavDropdown>
                                        </button>
                                        {/*<input*/}
                                        {/*    className="btn btn-primary mt-2 mx-auto d-block w-100"*/}
                                        {/*    type="button"*/}
                                        {/*    value="Buy"*/}
                                        {/*    onClick={() => this.buyProduct(LoginState.getUserId(), product._id)}*/}
                                        {/*/>*/}
                                        <input
                                            className="btn btn-primary mt-2 mx-auto d-block w-100"
                                            type="button"
                                            value="Remove"
                                            onClick={() => this.removeProductFromCart(LoginState.getUserId(), product._id)}
                                        />
                                    </div>
                            }
                            {
                                isStoreMangerGridView &&
                                <div>
                                    <Link to={'/products/update/' + product._id} style={{ textDecoration: 'none' }}>
                                        <input
                                            className="btn btn-primary mt-2 mx-auto d-block w-100"
                                            type="button"
                                            value="Update"
                                        />
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>

                </div>
            )
        });



        const image = require('../../images/pic_add.png');

        return (
            <div>

                <div className="row mt-1">
                    {
                        isStoreMangerGridView &&
                        <div className='col-md-3 col-sm-6 col-xs-6 mb-4'>
                            <div className="card">
                                <div className="card-body">
                                    <div
                                         className="row d-flex justify-content-center">
                                        <img src={image}
                                             alt="..."
                                             className="img-responsive p-1 productImg"/>
                                    </div>
                                    <strong>
                                        <p className="font-weight-bold">
                                            {'GIVE THE PRODUCT AN ATTRACTIVE NAME'}
                                        </p>
                                    </strong>
                                    <strong>
                                        <p className="font-weight-bold">
                                            Price and Discount
                                        </p>
                                    </strong>
                                    <div>
                                        <Link to={'/products/create'} style={{ textDecoration: 'none' }}>
                                            <input
                                                className="btn btn-primary mt-2 mx-auto d-block w-100"
                                                type="button"
                                                value="Create New"
                                            />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                    {
                        this.props.productList.length === 0 && isStoreMangerGridView === undefined &&
                            <div className="errorContainer mt-4">
                                <div className="alert alert-danger" role="alert">
                                   No Products to Display
                                </div>
                            </div>
                    }
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
    buyProduct = (id,type) => {

    };
}
export default Grid;