import React from "react";

import {BrowserRouter as Router,Link} from "react-router-dom";
import Route from "react-router-dom/Route";

//components
import ProductDetailsView from './productDetailsView';
import Login from './Login';
import Register from './Register';
import WishList from './WishList';
import Cart from './Cart';
import Category from "./Category";
import AdminCategoryView from "./AdminCategoryView";
import ManagerView from "./StoreManagerProductView";
import Error from './Error';

import Roles from '../../_helpers/role';

class App extends React.Component
{
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
                <Route path="/"  render={
                    () => {
                        return (
                            <div className="navigationContainer">
                                <h1 id="mainName">Fashion Store</h1>
                                    <div className="navigation">


                                        <Link to={"/"} style={{textDecoration: 'none'}}>
                                            <p className="NavigationItem mt-3">Home</p>
                                        </Link>

                                        {email != null && password != null &&
                                            <p className="NavigationItem mt-3" onClick={this.LogoutUser}>Logout</p>
                                        }
                                        {email == null && password == null &&
                                            <Link to={"/login"} style={{textDecoration: 'none'}}>
                                                <p className="NavigationItem mt-3">Login</p>
                                            </Link>
                                        }
                                        {email == null && password == null &&
                                            <Link to={"/register"} style={{textDecoration: 'none'}}>
                                                <p className="NavigationItem mt-3">Register</p>
                                            </Link>
                                        }
                                        {type != null && type === Roles.User &&
                                            <Link to={"/cart"} style={{textDecoration: 'none'}}>
                                                <p className="NavigationItem mt-3">Cart</p>
                                            </Link>
                                        }
                                        {type != null && type === Roles.User &&
                                            <Link to={"/wishList"} style={{textDecoration: 'none'}}>
                                                <p className="NavigationItem mt-3">WishList</p>
                                            </Link>
                                        }
                                        {
                                            email != null && password != null && type === Roles.Admin &&
                                            <Link to={"/categories"} style={{textDecoration: 'none'}}>
                                                <p className="NavigationItem mt-3">Categories</p>
                                            </Link>
                                        }
                                        {
                                            email != null && password != null && type === Roles.StoreManager &&
                                            <Link to={"/products"} style={{textDecoration: 'none'}}>
                                                <p className="NavigationItem mt-3">Products</p>
                                            </Link>
                                        }


                                    </div>
                            </div>

                        );
                    }
                }
                />
                <Route path={"/"} exact strict component={Category}/>
                <Route path={"/product/:pid"} exact strict component={ProductDetailsView}/>
                <Route path={"/login"} exact strict component={Login}/>
                <Route path={"/register"} exact strict component={Register}/>
                <Route path={"/wishList"} exact strict component={WishList}/>
                <Route path={"/cart"} exact strict component={Cart}/>
                <Route path={"/categories"} exact strict component={AdminCategoryView}/>
                <Route path={"/products"} exact strict component={ManagerView}/>
                <Route path={"/error"} exact strict component={Error}/>

            </Router>
        )
    }
    LogoutUser()
    {
        localStorage.removeItem("userName");
        localStorage.removeItem("userPassword");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        localStorage.removeItem("userImageLink");
        localStorage.removeItem("userEmail");

        window.location.href = "http://localhost:3000/";
    }
    getUser()
    {
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var id = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');

    }
}
export default App;