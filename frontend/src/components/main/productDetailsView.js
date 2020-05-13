import React from 'react';
import axios from 'axios';

import RatingList from '../lists/ratingList';

import '../../css/productDetailsView.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { product: [], isFirstTime: true };
    }

    render() {
        //user login informations
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var userid = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');

        const productId = this.props.match.params.pid;
        this.getProductDetails(productId);

        var name;
        var price;
        this.state.product.map((product) => {
            name = product.name;
            price = product.price;
            imageLink = product.imageLink;
        });

        return (
            <div className="productDetailscontainer">
                <div className="productDetails">
                    <img id="productImage" src={'http://localhost:5000/' + imageLink} />
                    <div className="productInfoContainer">
                        <h3 id="productName" className="mt-0">
                            {name}
                        </h3>
                        <h3 id="productPrice" className="mt-1">
                            {'Rs:' + price + '/='}
                        </h3>
                    </div>
                </div>
                <div className="buttonContainer">
                    <input
                        id="buyButton"
                        type="button"
                        value="Add to Cart"
                        onClick={() => this.addToCart(productId, userid)}
                    />
                    <input
                        id="addToWishListButton"
                        type="button"
                        value="Add to WishList"
                        onClick={() => this.addToWishList(productId, userid)}
                    />
                </div>
                <div className="ratings">
                    <RatingList productId={productId} />
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
