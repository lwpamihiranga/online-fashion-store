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
import Register from './components/main/Register';

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


      //user login informations
      var name = localStorage.getItem('userName');
      var password = localStorage.getItem('userPassword');
      var type = localStorage.getItem('userType');
      var id = localStorage.getItem('userId');
      var imageLink = localStorage.getItem('userImageLink');
      var email = localStorage.getItem('userEmail');
      //


      return(



        <Router>
          <Route path="/" exact strict render={
            () => {
              return(
                  <div>

                      <div className="categoryList">
                          <h1 id="mainName">Fashion Store</h1>
                          <div className="navigation">
                              {email != null  && password != null &&

                              <p className="NavigationItem" onClick={this.LogoutUser}>Logout</p>

                              }
                              {email == null  && password == null &&

                              <Link to={"/login"} style={{ textDecoration: 'none' }}>
                                  <p className="NavigationItem">Login</p>
                              </Link>
                              }
                              {email == null  && password == null &&
                              <Link to={"/register"} style={{ textDecoration: 'none' }}>
                                  <p className="NavigationItem">Register</p>
                              </Link>
                              }


                              {type != null && type === "user" &&
                              <p className="NavigationItem">WishList</p>
                              }


                      </div>
                      <CategoryList categoryList ={this.state.categoryList}/>
                  </div>
                  </div>

              );
            }
          }
          />
          <Route  path={"/product/:pid"} exact strict component={ProductDetailsView}/>
          <Route  path={"/login"} exact strict component={Login}/>
          <Route  path={"/register"} exact strict component={Register}/>

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
    getUser()
    {
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var id = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');

    }
    LogoutUser()
    {
        localStorage.removeItem("userName");
        localStorage.removeItem("userPassword");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        localStorage.removeItem("userImageLink");
        localStorage.removeItem("userEmail");

        window.location.href = "http://localhost:3000/";
    }
}
export default App;
