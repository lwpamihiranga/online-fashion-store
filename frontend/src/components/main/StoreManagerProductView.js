import React from 'react';
import UploadImage from '../../images/store_manager_upload.png';
import LoginState from '../../_helpers/loginState';
import '../../css/StoreManager.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GridView from '../lists/gridView';

import axios from 'axios';

class ManagerView extends React.Component {

    constructor(props) {
        super(props);

        this.state = (
            {
                productList : []
            });
        this.getAllProducts();
    }


    render() {
        this.checkAuthentication();


        return(
            <div className="productBody">
                <div className="productDiv">
                    <GridView productList={this.state.productList} isStoreMangerGridView ={true} />
                </div>
            </div>
        )

    }

    checkAuthentication = () => {
        if (!LoginState.isLoggedIn() || !LoginState.isManager()) {
            this.props.history.push('/error');
        }
    };
    getAllProducts = () => {

        axios.get('http://localhost:5000/api/products')
            .then(res => {

                if(res.status === 200)
                {

                    let list = res.data.reverse();
                    this.setState({productList : list});
                }

            })
            .catch(error => {
                console.log(error);
            })
    }
}
export default ManagerView;
