import React from 'react'
import axios from "axios";
import css from '../../css/productList.css'
import {BrowserRouter as Router,Link} from "react-router-dom";
import Route from "react-router-dom/Route";



import ProductViewComponent from '../main/productDetailsView';


class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = (
            {
                productList : [],
                isFirstTime : true
            }
        );
        this.handleProductItemClick = this.handleProductItemClick.bind();
    }
    render() {

        const id = this.props.categoryId;
        this.getProducts(id);

        const list = this.state.productList.map(product => {

            return(
                <Link to={"/product/" + product._id} style={{ textDecoration: 'none' }}>

                <div className="productItem" key={product._id} onClick={ () => this.handleProductItemClick(product)}>
                </div>
                    <h3 id="productName">{product.name}</h3>
                </Link>
            )
        });

        return(
            <div className="productList">
                {list}
            </div>
        )
    }
    getProducts(id)
    {
        //loading products according to the id and store in states
        axios.get("http://localhost:5000/api/products/findByCategoryId?id=" + id)
            .then(response => {
                if(response.status === 200)
                {
                    if(this.state.isFirstTime)
                    {
                        var list = response.data;
                        this.setState({productList :list, isFirstTime : false});
                    }

                }
            })
            .catch(error => console.log(error));
    }
    handleProductItemClick(product)
    {
        //this.props.history.push('http://localhost:3000/login')
       // window.location.href="http://localhost:3000/login";
    }
}
export default App;