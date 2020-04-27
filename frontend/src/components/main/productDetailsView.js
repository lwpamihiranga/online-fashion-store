import React from 'react';
import css from '../../css/productDetailsView.css';
import axios from "axios";
import RatingList from '../lists/ratingList';

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({product : []
            ,isFirstTime : true});

    }
    render() {

        const productId = this.props.match.params.pid;
        this.getProductDetails(productId);

        var name;
        var price;
        this.state.product.map(product => {
            name = product.name;
            price = product.price;
        });

        return(
           <div className="container">
               <div className="productDetails">
                   <img id="productImage" src="https://scontent.fcmb1-1.fna.fbcdn.net/v/t1.0-9/p720x720/93794211_215217119927900_2555796898816458752_o.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=xAkyRz7bRTsAX-a6X_w&_nc_ht=scontent.fcmb1-1.fna&_nc_tp=6&oh=48baa480cc116ab35d45fb24c3a153be&oe=5ECBD8C8"/>
                   <div>
                       <h1>{name}</h1>
                       <h1>{price}</h1>
                   </div>

               </div>
               <div className="ratings">
                   <RatingList productId = {productId}/>
               </div>

           </div>
        )
    }
    getProductDetails(id)
    {
        //loading the relevant product by the id
        axios.get("http://localhost:5000/api/products/findByProductId?id=" + id)
            .then(response => {
                if(response.status === 200)
                {
                    if(this.state.isFirstTime)
                    {
                        var product = response.data;
                        this.setState({product :product,isFirstTime : false});
                    }


                }
            })
            .catch(error => console.log(error));
    }
}
export default App;