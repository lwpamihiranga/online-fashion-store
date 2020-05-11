import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import css from '../../css/wishListList.css';

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({cartList: [],isNeedToRefresh : true});

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
            this.getCartListFromServer(userid);
        }

        const wishList = this.state.cartList.map(product => {

            return(
                <div>
                    <Link to={"/product/" + product._id} style={{ textDecoration: 'none' }}>
                        <div className="productItem" key={product._id}>
                        </div>
                        <h3 id="wishListproductName">{product.name}</h3>
                    </Link>
                    <input className="btn btn-primary mt-2 mx-auto d-block  w-75" type="button" value="Buy" onClick={() => this.buyProduct(userid,product._id)}/>
                    <input className="btn btn-primary mt-2 mx-auto d-block  w-75" type="button" value="Remove" onClick={() => this.removeProductFromCart(userid,product._id)}/>
                </div>

            )
        });
        return(
            <div className="wishListTopContainer">
                <h1 id="wishListTopic">Your Cart</h1>
                <div className="wishListContainer">
                    {wishList}
                </div>
            </div>
        )
    }
    getCartListFromServer(userId)
    {
        axios.get("http://localhost:5000/api/cart/find?userId=" + userId)
            .then(response => {
                if(response.status === 200)
                {
                    if(this.state.isNeedToRefresh)
                    {
                        var list = response.data;
                        list.reverse();
                        this.setState({cartList :list, isNeedToRefresh : false});
                    }

                }
            })
            .catch(error => console.log(error));
    }
    removeProductFromCart = (userId,productId) => {

        axios.post("http://localhost:5000/api/cart/delete?userId=" + userId + "&productId=" + productId)
            .then(response => {
                if(response.status === 200)
                {
                    //var list = response.data;
                    this.setState({cartList :[], isNeedToRefresh : true});
                }
            })
            .catch(error => console.log(error));
    };
    buyProduct = (userId,productId) => {

        // if(productId != null && userId != null)
        // {
        //     axios.post("http://localhost:5000/api/cart/create?productId=" + productId +"&userId=" + userId)
        //         .then(response => {
        //             if (response.status === 200)
        //             {
        //                 var list = response.data;
        //                 if(list.length === 0)
        //                 {
        //                     alert("This product has already added to your cart");
        //                 }
        //                 else
        //                 {
        //                     alert("Successfully added to the cart!");
        //                 }
        //             }
        //         })
        //         .catch(error => console.log(error));
        // }
        // else
        // {
        //     if(productId == null)
        //     {
        //         alert("ProductId is null");
        //     }
        //     if(userId == null)
        //     {
        //         alert("Login to the system!");
        //     }
        // }


    }
}
export default App;