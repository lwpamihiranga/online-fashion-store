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
                productId : '',
                name : '',
                category : '',
                price : '',
                discount : '',
                description : '',
                imageLink : '',
                prevImageLink : ''
            });


    }


    render() {
        this.checkAuthentication();

        if(this.state.categoryList.length === 0)
        {
            this.getAllCategories();
        }

        const productId = this.props.match.params.pid;
        if(productId !== undefined)
        {
            if(this.state.productId === '')
            {
                this.getProductDetails(productId);
            }
        }


        const categories = this.state.categoryList.map(cat => {
            if(this.state.category === cat._id )
            {
                return(<option selected value={cat._id}>{cat.catName}</option>)
            }
            else
            {
                return (<option value={cat._id}>{cat.catName}</option>)
            }
        });


        return (
            <div className="container-fluid">
                <div className="p-5">
                    <div className="form-group2">
                        <div className="form-group">
                            <img className="img-fluid mx-auto d-block loginImage" src={UploadImage} />
                            <input
                                type="file"
                                id="file-input"
                                className="btn btn-primary mt-2 mx-auto d-block form-group"
                                name="imageLink"
                                onChange={(e) => this.setState({ imageLink: e.target.files[0] })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr" className="label">Product Name:</label>
                            <input type="text" value={this.state.name} className="form-control" id="usr"  onChange={(e) => this.setState({ name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr" className="label">Category:</label>
                            <select className="form-control w-100 p-2" onChange={(e) => this.setState({ category: e.target.value})}>
                                <option disabled selected value/>
                                {categories}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd" className="label">Price:</label>
                            <input type="number" value={this.state.price} min="1" step="any" className="form-control" id="pwd"  onChange={(e) => this.setState({ price: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd" className="label">Discount:</label>
                            <input type="number" value={this.state.discount} min="1" step="any" className="form-control" id="pwd"  onChange={(e) => this.setState({ discount: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1" className="label">Description</label>
                            <textarea className="form-control" value={this.state.description} id="exampleFormControlTextarea1" rows="4"  onChange={(e) => this.setState({ description: e.target.value})}/>
                        </div>
                        {
                            this.state.productId === ''
                            &&
                            <div className="form-group">
                                <input type="button" value="Submit" className="btn btn-primary mt-2 mx-auto d-block w-100" onClick={() => this.postProduct()}/>
                            </div>
                        }
                        {
                            this.state.productId !== ''
                            &&
                            <div className="form-group">
                                <input type="button" value="Update" className="btn btn-primary mt-2 mx-auto d-block w-100" onClick={() => this.updateProduct()}/>
                            </div>
                        }

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
    };
    getProductDetails = (id) => {
        //loading the relevant product by the id
        axios
            .get('http://localhost:5000/api/products/findByProductId?id=' + id)
            .then((response) => {
                if (response.status === 200)
                {

                    const list = response.data;

                    list.map(item => {


                        this.setState({

                            productId : item._id,
                            name : item.name,
                            category : item.categoryId,
                            price : item.price,
                            discount : item.discount,
                            description : item.description,
                            prevImageLink :item.imageLink
                        })

                    });
                }
            })
            .catch((error) => console.log('Fetch product by id error: ', error));
    };
    updateProduct = () => {

        if (this.state.name === '' || this.state.price === '' || this.state.description === '' || this.state.category === '') {
            alert('Enter Details Properly!');
            return;
        }

        if (this.state.imageLink === '')
        {
            axios.post('http://localhost:5000/api/products/updateWithoutImage',{
                productId : this.state.productId,
                name:this.state.name,
                price : this.state.price,
                description : this.state.description,
                discount : this.state.discount,
                categoryId : this.state.category
            })
                .then(res => {
                    if(res.status === 201)
                    {
                        this.props.history.push('/products');
                    }
                    else
                    {
                        this.props.history.push('/products');
                    }
                })
                .catch(error => {
                    this.props.history.push('/products');
                })
        }
        else
        {
            var formdata = new FormData();
            formdata.append('productId',this.state.productId);
            formdata.append('name', this.state.name);
            formdata.append('price', this.state.price);
            formdata.append('description', this.state.description);
            formdata.append('discount', this.state.discount);
            formdata.append('categoryId',this.state.category);
            if(this.state.discount !== '' && this.state.discount > 0)
            {
                formdata.append('hasDiscount', true);
            }
            else
            {
                formdata.append('hasDiscount', false);
            }

            formdata.append('imageLink', this.state.imageLink);

            axios.post('http://localhost:5000/api/products/update',formdata)
                .then(res => {
                    if(res.status === 201)
                    {
                        this.props.history.push('/products');
                    }
                    else
                    {
                        this.props.history.push('/products');
                    }
                })
                .catch(error => {
                    this.props.history.push('/products');
                })

        }

    }
}
export default ManagerView;
