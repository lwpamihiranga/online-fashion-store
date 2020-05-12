import React from "react";
import LoginState from '../../_helpers/loginState';

import CartList from '../lists/cartList';
class App extends React.Component
{
    render() {

        this.checkAuthentication();

        return(
            <CartList/>
        )
    }
    checkAuthentication = () =>
    {
        if(!LoginState.isLoggedIn() || !LoginState.isUser()) {
            this.props.history.push("/error");
        }
    };
}
export default App;