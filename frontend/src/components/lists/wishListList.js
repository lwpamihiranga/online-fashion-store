import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import css from '../../css/wishListList.css';

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({wishList: [],isNeedToRefresh : true});

    }

    render() {

        //user login informations
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var userid = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');

        if(this.state.isNeedToRefresh)
        {
            this.getWishListFromServer(userid);
        }

        const wishList = this.state.wishList.map(product => {

            return(
                <div>
                    <Link to={"/product/" + product._id} style={{ textDecoration: 'none' }}>
                        <div className="productItem" key={product._id}>
                        </div>
                        <h3 id="wishListproductName">{product.name}</h3>
                    </Link>
                    <input id="addTocartBtn" type="button" value="Add to Cart" onClick={() => this.addToCart(userid,product._id)}/>
                    <input id="wishListRemoveBtn" type="button" value="Remove" onClick={() => this.removeProductFromWishList(userid,product._id)}/>
                </div>

            )
        });
        return(
            <div className="wishListTopContainer">
                <h1 id="wishListTopic">Your WishList</h1>
                <div className="wishListContainer">
                    {wishList}
                </div>
            </div>
        )
    }
    getWishListFromServer(userId)
    {
        axios.get("http://localhost:5000/api/wishList/find?userId=" + userId)
            .then(response => {
                if(response.status === 200)
                {
                    if(this.state.isNeedToRefresh)
                    {
                        var list = response.data;
                        list.reverse();
                        this.setState({wishList :list, isNeedToRefresh : false});
                    }

                }
            })
            .catch(error => console.log(error));
    }
    removeProductFromWishList = (userId,productId) => {

        axios.post("http://localhost:5000/api/wishList/delete?userId=" + userId + "&productId=" + productId)
            .then(response => {
                if(response.status === 200)
                {
                    //var list = response.data;
                    this.setState({wishList :[], isNeedToRefresh : true});
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


    }
}
export default App;