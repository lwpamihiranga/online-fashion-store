import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import '../../css/productList.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            isFirstTime: true,
        };
        this.handleProductItemClick = this.handleProductItemClick.bind();
    }

    render() {
        const id = this.props.categoryId;
        this.getProducts(id);

        const list = this.state.productList.map((product) => {


                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = this.arrayBufferToBase64(product.image.data.data);
                var link = base64Flag + imageStr;


            return (
                <Link to={'/product/' + product._id} style={{ textDecoration: 'none' }}>

                    <div key={product._id} onClick={() => this.handleProductItemClick(product)}>
                        <img src={link} alt="..." className="productItem" />
                    </div>
                    <strong>
                        <p id="productNameMain" className="font-weight-bold">
                            {product.name}
                        </p>
                    </strong>
                </Link>
            );
        });

        return <div className="productList">{list}</div>;
    }
    arrayBufferToBase64(buffer)
    {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    getProducts(id) {
        //loading products according to the id and store in states
        axios
            .get('http://localhost:5000/api/products/findByCategoryId?id=' + id)
            .then((response) => {
                if (response.status === 200) {
                    if (this.state.isFirstTime) {
                        var list = response.data;
                        this.setState({ productList: list, isFirstTime: false });
                    }
                }
            })
            .catch((error) => console.log('Product fetch by Category id error: ', error));
    }

    handleProductItemClick(product) {
        //this.props.history.push('http://localhost:3000/login')
        // window.location.href="http://localhost:3000/login";
    }
}
export default App;
