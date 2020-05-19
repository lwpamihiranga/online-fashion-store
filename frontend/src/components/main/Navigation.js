import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

//components
import ProductDetailsView from './productDetailsView';
import Login from './Login';
import Register from './Register';
import WishList from './WishList';
import Cart from './Cart';
import Category from './Category';
import AdminCategoryView from './AdminCategoryView';
import ManagerView from './StoreManagerProductView';
import RegisterManager from './RegisterStoreManager';
import Error from './Error';
import ProductCreateAndUpdate from './ProductCreateAndUpdate';

import Roles from '../../_helpers/role';

import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../css/style.css';

import LoginState from '../../_helpers/loginState';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            selectedCategory: '',
            productList: [],
        };
        this.getCategoriesFromApi();
    }
    categories = [];

    render() {
        //user login informations
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var id = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');

        var url;
        if (LoginState.isLoggedIn()) {
            url = require('../../uploads/profile-pic/' + LoginState.getUserImage());
        }

        return (
            <Router>
                <Route
                    path="/"
                    render={() => {
                        return (
                            <Navbar expand="lg" sticky="top" className="navbar-color bg-primary p-3">
                                <Navbar.Brand href="/">Fashion Store</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="/" className="header-link">
                                            Home
                                        </Nav.Link>
                                        <NavDropdown title="Catagories">
                                            {this.categories.map((val) => {
                                                return (
                                                    <span>
                                                        <NavDropdown.Item href={'/productByCategory/' + val._id}>
                                                            {val.catName}
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Divider />
                                                    </span>
                                                );
                                            })}
                                        </NavDropdown>
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
                                        {email != null && password != null && type === Roles.Admin && (
                                            <Nav.Link href="/register/manager" className="header-link">
                                                Register
                                            </Nav.Link>
                                        )}
                                        {email != null && password != null && type === Roles.StoreManager && (
                                            <Nav.Link href="/products" className="header-link">
                                                Products
                                            </Nav.Link>
                                        )}
                                    </Nav>
                                    <Nav>
                                        {email == null && password == null && (
                                            <Nav.Link href="/login" className="">
                                                <Button variant="dark">Login</Button>
                                            </Nav.Link>
                                        )}
                                        {email == null && password == null && (
                                            <Nav.Link href="/register/user" className="">
                                                <Button variant="dark">Register</Button>
                                            </Nav.Link>
                                        )}
                                    </Nav>
                                    {LoginState.isLoggedIn() && (
                                        <Nav.Item className="justify-content-end">
                                            <img src={url} className="userImage rounded-circle" />
                                        </Nav.Item>
                                    )}
                                    {name != null && (
                                        <Navbar.Text className="justify-content-end">
                                            Signed in as:
                                            <a> {name}</a>
                                        </Navbar.Text>
                                    )}
                                    <Nav>
                                        {email != null && password != null && (
                                            <Nav.Link href="/" className="" onClick={this.LogoutUser}>
                                                <Button variant="dark">Logout</Button>
                                            </Nav.Link>
                                        )}
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        );
                    }}
                />

                <Route path={'/'} exact strict component={Category} />
                <Route path={'/product/:pid'} exact strict component={ProductDetailsView} />
                <Route path={'/login'} exact strict component={Login} />
                <Route path={'/register/user'} exact strict component={Register} />
                <Route path={'/wishList'} exact strict component={WishList} />
                <Route path={'/cart'} exact strict component={Cart} />
                <Route path={'/categories'} exact strict component={AdminCategoryView} />
                <Route path={'/products'} exact strict component={ManagerView} />
                <Route path={'/updateProduct'} exact strict component={ProductCreateAndUpdate} />
                <Route path={'/error'} exact strict component={Error} />
                <Route path={'/productByCategory/:cid'} exact strict component={Category} />
                <Route path={'/register/manager'} exact strict component={RegisterManager} />

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

    getCategoriesFromApi() {
        //loading categories from the api to the state
        axios
            .get('http://localhost:5000/api/category/')
            .then((response) => {
                if (response.status === 200) {
                    var list = response.data;
                    this.categories = list;
                    list.map((itm, index) => {
                        if (index === 0) {
                            this.setState({ categoryList: list, selectedCategory: itm._id });
                            this.onCategoryChanged(itm._id);
                        }
                    });
                }
            })
            .catch((error) => console.log('Category fetch error: ', error));
    }
}
export default App;
