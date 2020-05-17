import React from 'react';
import axios from 'axios';

import css from '../../css/productDetailsView.css';
import RatingList from '../lists/ratingList';
const LoginState  = require('../../_helpers/loginState');





class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { product: [], isFirstTime: true };
    }

    render() {


        const productId = this.props.match.params.pid;
        this.getProductDetails(productId);

        var name;
        var price;
        var imageLink;
        var discount;
        var discountPrice = 0;
        var description;

        this.state.product.map((product) => {
            name = product.name;
            price = product.price;
            imageLink = require('../../uploads/products/' + product.imageLink);
            if(product.discount !== '' && product.discount >= 0)
            {
                discount = (product.discount / product.price) * 100;
            }
            else
            {
                discount = product.discount;
            }
            discountPrice =  product.discount;
            description = product.description;

        });

        return (
            <div className="productDetailscontainer">

                <div className="cont">
                    <div className="row">
                        <div className="col">
                            <img id="productImage" src={imageLink} />
                        </div>
                        <div className="col-sm-6 infoDiv">

                            <div className="productInfoContainer">
                                <strong id="productName">
                                    {name}
                                </strong>
                                {
                                    discount !== '' && discount > 0
                                    &&
                                    <strong>
                                        {'LKR ' + (price - discountPrice) + '.0/='}
                                    </strong>
                                }
                                {
                                    discount !== '' && discount > 0
                                    &&
                                    <strong>
                                        <p className="font-weight-bold">
                                            {~~discount + '% OFF  |  '}
                                            <strike>{'LKR ' + price + '/='}</strike>
                                        </p>
                                    </strong>
                                }
                                {
                                    discount === '' || discount <= 0
                                    &&
                                    <strong>
                                        <p className="font-weight-bold">
                                            {'LKR ' + price + '/='}
                                        </p>
                                    </strong>
                                }
                                <strong>
                                    {description}
                                </strong>
                                <input
                                    className="btn btn-primary w-50 mt-3 btn"
                                    type="button"
                                    value="Add to Cart"
                                    onClick={() => this.addToCart(productId, LoginState.getUserId())}
                                />
                                <input
                                    className="btn btn-primary w-50 mt-2 btn"
                                    type="button"
                                    value="Add to WishList"
                                    onClick={() => this.addToWishList(productId, LoginState.getUserId())}
                                />
                                <div className="ratings">
                                    <RatingList productId={productId} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



                <div className="productDetails">

                </div>
            </div>
        );
    }

    getProductDetails(id) {
        //loading the relevant product by the id
        axios
            .get('http://localhost:5000/api/products/findByProductId?id=' + id)
            .then((response) => {
                if (response.status === 200) {
                    if (this.state.isFirstTime) {
                        var product = response.data;
                        this.setState({ product: product, isFirstTime: false });
                    }
                }
            })
            .catch((error) => console.log('Fetch product by id error: ', error));
    }

    addToWishList = (productId, userId) => {
        if (productId != null && userId != null) {
            axios
                .post('http://localhost:5000/api/wishList/create?productId=' + productId + '&userId=' + userId)
                .then((response) => {
                    if (response.status === 200) {
                        var list = response.data;
                        if (list.length === 0) {
                            alert('This product has already added to your wishList');
                        } else {
                            alert('Successfully added to the wishList!');
                        }
                    }
                })
                .catch((error) => console.log('Add product to wishlist error: ', error));
        } else {
            if (productId == null) {
                alert('ProductId is null');
            }
            if (userId == null) {
                alert('Login to the system!');
            }
        }
    };

    addToCart = (productId, userId) => {
        if (productId != null && userId != null) {
            axios
                .post('http://localhost:5000/api/cart/create?productId=' + productId + '&userId=' + userId)
                .then((response) => {
                    if (response.status === 200) {
                        var list = response.data;
                        if (list.length === 0) {
                            alert('This product has already added to your cart');
                        } else {
                            alert('Successfully added to the cart!');
                        }
                    }
                })
                .catch((error) => console.log('Add product to cart error: ', error));
        } else {
            if (productId == null) {
                alert('ProductId is null');
            }
            if (userId == null) {
                alert('Login to the system!');
            }
        }
    };
}
export default App;
