import React from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

//components
import ProductDetailsView from './productDetailsView';
import Login from './Login';
import Register from './Register';
import WishList from './WishList';
import Cart from './Cart';
import Category from './Category';
import AdminCategoryView from './AdminCategoryView';
import ManagerView from './StoreManagerProductView';
import Error from './Error';

import Roles from '../../_helpers/role';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../../css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
    render() {
        //user login informations
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var id = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');
        //

        return (
            <Router>
                <Route
                    path="/"
                    render={() => {
                        return (
                            <Navbar expand="lg" sticky="top" className="navbar-color  bg-primary p-3">
                                <Navbar.Brand href="/">Fashion Store</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="/" className="header-link">
                                            Home
                                        </Nav.Link>
                                        {email != null && password != null && (
                                            <Nav.Link href="/" className="header-link" onClick={this.LogoutUser}>
                                                Logout
                                            </Nav.Link>
                                        )}
                                        {email == null && password == null && (
                                            <Nav.Link href="/login" className="header-link">
                                                Login
                                            </Nav.Link>
                                        )}
                                        {email == null && password == null && (
                                            <Nav.Link href="/register" className="header-link">
                                                Register
                                            </Nav.Link>
                                        )}
                                        {type != null && type === Roles.User && (
                                            <Nav.Link href="/cart" className="header-link">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                                Cart
                                            </Nav.Link>
                                        )}
                                        {type != null && type === Roles.User && (
                                            <Nav.Link href="/wishList" className="header-link">
                                                <FontAwesomeIcon icon={faHeart} className="icon" />
                                                WishList
                                            </Nav.Link>
                                        )}
                                        {email != null && password != null && type === Roles.Admin && (
                                            <Nav.Link href="/categories" className="header-link">
                                                Categories
                                            </Nav.Link>
                                        )}
                                        {email != null && password != null && type === Roles.StoreManager && (
                                            <Nav.Link href="/products" className="header-link">
                                                Products
                                            </Nav.Link>
                                        )}
                                    </Nav>
                                    {name != null && (
                                        <Navbar.Text className="justify-content-end">
                                            Signed in as:
                                            <a> {name}</a>
                                        </Navbar.Text>
                                    )}
                                </Navbar.Collapse>
                            </Navbar>
                        );
                    }}
                />

                <Route path={'/'} exact strict component={Category} />
                <Route path={'/product/:pid'} exact strict component={ProductDetailsView} />
                <Route path={'/login'} exact strict component={Login} />
                <Route path={'/register'} exact strict component={Register} />
                <Route path={'/wishList'} exact strict component={WishList} />
                <Route path={'/cart'} exact strict component={Cart} />
                <Route path={'/categories'} exact strict component={AdminCategoryView} />
                <Route path={'/products'} exact strict component={ManagerView} />
                <Route path={'/error'} exact strict component={Error} />
            </Router>
        );
    }

    LogoutUser() {
        localStorage.removeItem('userName');
        localStorage.removeItem('userPassword');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userImageLink');
        localStorage.removeItem('userEmail');

        window.location.href = 'http://localhost:3000/';
    }

    getUser() {
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var id = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');
    }
}
export default App;
