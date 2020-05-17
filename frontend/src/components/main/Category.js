import React from 'react';
import axios from 'axios';
import CategoryList from '../lists/categoryList';
import GridView from '../lists/gridView';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            selectedCategory : '',
            productList : []
        };
        this.getCategoriesFromApi();
    }

    render() {

        const categories = this.state.categoryList.map(cat => {

            if(this.state.selectedCategory === cat._id)
            {
                return(<option selected value={cat._id}>{cat.catName}</option>)
            }
            else
            {
                return(<option value={cat._id}>{cat.catName}</option>)
            }
        });



        return(
            <div>
                <div>
                    <select className="mt-2 ml-2 mb-2"
                            onChange={(e) => this.onCategoryChanged(e.target.value)}>
                        {categories}
                    </select>
                </div>
                <GridView productList={this.state.productList}/>
            </div>
            )
    }

    getCategoriesFromApi() {
        //loading categories from the api to the state
        axios
            .get('http://localhost:5000/api/category/')
            .then((response) => {
                if (response.status === 200) {
                    var list = response.data;

                    list.map((itm,index) => {
                        if(index === 0)
                        {
                            this.setState({ categoryList: list,selectedCategory : itm._id });
                            this.onCategoryChanged( itm._id);
                        }
                    });


                }
            })
            .catch((error) => console.log('Category fetch error: ', error));
    }
    onCategoryChanged = (catId) => {

        this.setState({ selectedCategory: catId});

        axios.get('http://localhost:5000/api/products/findByCategoryId?id=' + catId)
            .then(res => {

                if(res.status === 200)
                {
                    this.setState({productList : res.data});
                }

            })
            .catch(error => {

            });
    }
}
export default App;
