import React from 'react';

import CartList from '../lists/cartList';

import LoginState from '../../_helpers/loginState';
import GridView from "../lists/gridView";
import axios from "axios";



class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({productList : []});

        this.getCartListFromServer(LoginState.getUserId());
    }

    render() {
        this.checkAuthentication();

        return (
            <div className="productBody">
                <div className="productDiv">
                    <GridView  productList={this.state.productList}  isCartList = {true} getCartListFromServer={this.getCartListFromServer}/>
                </div>
            </div>
        );
    }

    checkAuthentication = () => {
        if (!LoginState.isLoggedIn() || !LoginState.isUser()) {
            this.props.history.push('/error');
        }
    };
    getCartListFromServer = (userId) => {

        axios.get('http://localhost:5000/api/cart/find?userId=' + userId)
            .then((response) => {
                if (response.status === 200) {

                    var list = response.data;
                    list.reverse();
                    this.setState({ productList: list});

                }
            })
            .catch((error) => console.log(error));

    };
}
export default App;
