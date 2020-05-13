import React from 'react';

import WishListList from '../lists/wishListList';

import LoginState from '../../_helpers/loginState';

class App extends React.Component {
    render() {
        this.checkAuthentication();

        return (
            <div>
                <WishListList />
            </div>
        );
    }

    checkAuthentication = () => {
        if (!LoginState.isLoggedIn() || !LoginState.isUser()) {
            this.props.history.push('/error');
        }
    };
}
export default App;
