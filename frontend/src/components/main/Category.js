import React from 'react';
import axios from 'axios';

import CategoryList from '../lists/categoryList';


class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            categoryList : []
        };
        this.getCategoriesFromApi();


    }
    render() {

        return(
            <CategoryList categoryList ={this.state.categoryList}/>
        )
    }
    getCategoriesFromApi()
    {
        //loading categories from the api to the states
        axios.get("http://localhost:5000/api/category/")
            .then(response => {
                if(response.status === 200)
                {
                    var list = response.data;
                    this.setState({categoryList :list});
                    console.log("called");
                }
            })
            .catch(error => console.log(error));
    }
}
export default App;
