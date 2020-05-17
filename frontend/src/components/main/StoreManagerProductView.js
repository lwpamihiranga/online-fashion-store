import React from 'react';
import UploadImage from '../../images/store_manager_upload.png';
import LoginState from '../../_helpers/loginState';
import '../../css/StoreManager.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class ManagerView extends React.Component {

    constructor(props) {
        super(props);

        this.state = (
            {
                categoryList : [],
                name : '',
                category : '',
                price : '',
                discount : '',
                description : '',
                imageLink : ''
            });
    }


    render() {
        this.checkAuthentication();
        this.getAllCategories();


        const categories = this.state.categoryList.map(cat => {

            return (
                <option value={cat._id}>{cat.catName}</option>
            )
        });


        return (
            <div className="container-fluid mt-4">
                <div className="p-5">
                    <div className="form-group">
                        <img className="img-fluid mx-auto d-block loginImage" src={UploadImage} />
                        <input
                            type="file"
                            id="file-input"
                            className="btn btn-primary mt-2 mx-auto d-block"
                            name="imageLink"
                            onChange={(e) => this.setState({ imageLink: e.target.files[0] })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Product Name:</label>
                        <input type="text" className="form-control" id="usr"  onChange={(e) => this.setState({ name: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="usr">Category:</label>
                        <select id="cars" className="form-control w-100 p-2" onChange={(e) => this.setState({ category: e.target.value})}>
                            <option disabled selected value></option>
                            {categories}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Price:</label>
                        <input type="number" min="1" step="any" className="form-control" id="pwd"  onChange={(e) => this.setState({ price: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Discount:</label>
                        <input type="number" min="1" step="any" className="form-control" id="pwd"  onChange={(e) => this.setState({ discount: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"  onChange={(e) => this.setState({ description: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <input type="button" value="Submit" className="btn btn-primary mt-2 mx-auto d-block w-100" onClick={() => this.postProduct()}/>
                    </div>
                </div>
            </div>
        );
    }

    checkAuthentication = () => {
        if (!LoginState.isLoggedIn() || !LoginState.isManager()) {
            this.props.history.push('/error');
        }
    };
    getAllCategories = () => {

        axios.get('http://localhost:5000/api/category')
            .then(response => {

                if(response.status === 200)
                {
                    this.setState({categoryList : response.data})
                }

            })
            .catch(error => {

            });
    };
    postProduct = () => {


        if(this.state.name === '' || this.state.price === '' || this.state.description === '' || this.state.category === '')
        {
            alert('Enter Details Properly!');
            return;
        }
        if(this.state.imageLink === '')
        {
            alert('Upload an Image!');
            return;
        }

        var formdata = new FormData();
        formdata.append('imageLink', this.state.imageLink);
        formdata.append('name', this.state.name);
        formdata.append('price', this.state.price);
        formdata.append('description', this.state.description);
        formdata.append('discount', this.state.discount);

        if(this.state.discount !== '' && this.state.discount > 0)
        {
            formdata.append('hasDiscount', true);
        }
        else
        {
            formdata.append('hasDiscount', false);
        }
        formdata.append('categoryId',this.state.category);

        axios.post('http://localhost:5000/api/products',formdata)
            .then(res => {
                if(res.status === 201)
                {
                    alert('Upload success');
                }
                else
                {
                    alert('Upload Failed');
                }
            })
            .catch(error => {
                alert(error);
            })
    }
}
export default ManagerView;
