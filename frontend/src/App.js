import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';


import CategoryList from './components/lists/categoryList';
import {BrowserRouter as Router,Link} from "react-router-dom";
import Route from "react-router-dom/Route";

//components
import ProductDetailsView from './components/main/productDetailsView';
import Login from './components/main/Login';

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
        <Router>
          <Route path="/" exact strict render={
            () => {
              return(
                  <div>
                      <CategoryList categoryList ={this.state.categoryList}/>
                  </div>

              );
            }
          }
          />
          <Route  path={"/product/:pid"} exact strict component={ProductDetailsView}/>
          <Route  path={"/login"} exact strict component={Login}/>

        </Router>
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
