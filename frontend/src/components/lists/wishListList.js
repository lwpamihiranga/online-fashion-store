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
}
export default App;