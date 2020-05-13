import React from 'react';

import CartList from '../lists/cartList';

import LoginState from '../../_helpers/loginState';

class App extends React.Component {
    render() {
        this.checkAuthentication();

        return <CartList />;
    }

    checkAuthentication = () => {
        if (!LoginState.isLoggedIn() || !LoginState.isUser()) {
            this.props.history.push('/error');
        }
    };
}
export default App;
