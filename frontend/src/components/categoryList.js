import React from 'react'
import css from '../css/catList.css'
import ProductList from '../components/productList';

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
                {list}
            </div>
        )

    }
}

export default App;