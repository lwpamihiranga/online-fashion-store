import React from 'react';
import css from './css/productDetailsView.css';
import axios from "axios";

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
                   <img id="productImage" src="https://lh3.googleusercontent.com/proxy/xRKiLuKs6XmLuUlyRVBhk-z_eXnlffYa3U-KXaRIcV2qCRJg_chXZ3JALVrdcKX1cXyldrQoTXuByOztNtv6jmuP6DCf9_bS7xvb740LbtgrXQ_c7zyebV-5uufOX_iNmBPXfODFQplBwyZWLWBI24Hz8VGd4Zup0VGGh1hiqs2OrBiuvRP2_Y43yHQZQJ0JeZf5bbdZR3B-HFqebA"/>
                   <div>
                       <h1>{name}</h1>
                       <h1>{price}</h1>
                   </div>

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