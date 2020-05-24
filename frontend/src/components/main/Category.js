import React from 'react';
import axios from 'axios';
import GridView from '../lists/gridView';
import style from '../../css/style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            selectedCategory: '',
            productList: [],
        };
    }

    render() {
        const categoryId = this.props.match.params.cid;

        if (categoryId !== undefined) {
            console.log('ran', categoryId);
            this.getProductsByCategory(categoryId);
        } else {
            this.getProducts();
        }
        return (
            <div className="productBody">
                <div className="productDiv">
                    <GridView productList={this.state.productList} isCategory={true} />
                </div>
            </div>
        );
    }

    getProducts = () => {
        axios
            .get('http://161.35.114.131:5000/api/products/')
            .then((res) => {
                console.log(res.data);

                if (res.status === 200) {
                    this.setState({ productList: res.data });
                }
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    };

    getProductsByCategory = (catId) => {
        axios
            .get('http://161.35.114.131:5000/api/products/findByCategoryId?id=' + catId)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ productList: res.data });
                }
            })
            .catch((error) => {});
    };
}
export default App;
