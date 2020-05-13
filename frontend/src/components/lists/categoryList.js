import React from 'react';

import ProductList from './productList';

import '../../css/catList.css';

class App extends React.Component {
    render() {
        var categories = [];
        categories = this.props.categoryList;
        const list = categories.map((category) => {
            return (
                <div className="categoryItem" key={category._id}>
                    <h3 id="catName">{category.catName}</h3>

                    <div className="productList">
                        <ProductList categoryId={category._id} />
                    </div>
                </div>
            );
        });

        return <div>{list}</div>;
    }
}

export default App;
