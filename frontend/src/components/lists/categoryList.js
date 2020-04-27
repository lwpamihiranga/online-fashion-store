import React from 'react'
import css from '../../css/catList.css'
import ProductList from './productList';
import {Link} from "react-router-dom";

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








        var categories = [];
        categories = this.props.categoryList;
        const list = categories.map(category => {

            return(
                <div className="categoryItem" key={category._id}>
                    <h3 id="catName">{category.catName}</h3>

                    <div className="productList">
                        <ProductList categoryId={category._id}/>
                    </div>

                </div>
            )
        });

        return(
            <div className="categoryList">
                <h1 id="mainName">Fashion Store</h1>
                <div className="navigation">
                    {email != null  && password != null &&

                        <p className="NavigationItem" onClick={this.LogoutUser}>Logout</p>

                    }
                    {email == null  && password == null &&
                        <Link to={"/login"} style={{ textDecoration: 'none' }}>
                            <p className="NavigationItem">Login</p>
                        </Link>
                    }
                    {email == null  && password == null &&
                        <Link to={"/register"} style={{ textDecoration: 'none' }}>
                            <p className="NavigationItem">Register</p>
                        </Link>
                    }





                </div>
                <div>
                    {list}
                </div>

            </div>
        )

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
}

export default App;