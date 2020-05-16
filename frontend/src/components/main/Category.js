import React from 'react';
import axios from 'axios';
import CategoryList from '../lists/categoryList';
import GridView from '../lists/gridView';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
        };
        this.getCategoriesFromApi();
    }

    render() {
        return(
            <div>
                {/*<CategoryList categoryList={this.state.categoryList} />*/}


                <GridView/>
                {/*<div className="row mt-5">*/}
                {/*    <div className="col-sm bg-primary">1 of 4</div>*/}
                {/*    <div className="col-sm bg-danger">2 of 4</div>*/}
                {/*    <div className="col-sm bg-success">3 of 4</div>*/}
                {/*    <div className="col-sm bg-info">4 of 4</div>*/}
                {/*</div>*/}
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
                    this.setState({ categoryList: list });
                }
            })
            .catch((error) => console.log('Category fetch error: ', error));
    }
}
export default App;
