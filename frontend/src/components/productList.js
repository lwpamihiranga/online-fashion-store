import React from 'react'
import axios from "axios";
import css from '../css/productList.css'

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = (
            {
                productList : [],
                isFirstTime : true
            }
        )
    }
    render() {

        const id = this.props.categoryId;
        this.getProducts(id);

        const list = this.state.productList.map(product => {

            return(
                <div className="productItem" key={product._id}>
                    <h3 id="productName">{product.name}</h3>
                </div>
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
                        console.log("called");
                    }

                }
            })
            .catch(error => console.log(error));
    }
}
export default App;