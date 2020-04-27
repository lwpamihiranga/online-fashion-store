import React from 'react'
import css from '../../css/catList.css'
import ProductList from './productList';
import {Link} from "react-router-dom";

class App extends React.Component
{
    render() {

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
                    <Link to={"/login"} style={{ textDecoration: 'none' }}>
                        <p className="NavigationItem">Login</p>
                    </Link>
                    <Link to={"/register"} style={{ textDecoration: 'none' }}>
                        <p className="NavigationItem">Register</p>
                    </Link>
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
}

export default App;