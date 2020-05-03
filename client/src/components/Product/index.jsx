import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { Link } from 'react-router-dom';

import { getProductDetail, clearProductDetail } from '../../actions/product_actions';
import { addToCart } from '../../actions/user_actions';
import Pizza from '../../Resources/images/pizza2.png'
import ProductInfo from './product_info';

class ProductPage extends Component {
    
    state = {
        DialogOpen: false
    }
    
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response=>{
            if(!this.props.products.prodDetail){
                this.props.history.push('/');
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearProductDetail())
    }

    addToCartHandler = (id) =>{
        this.props.dispatch(addToCart(id));
        this.setState({
            DialogOpen: true
        })
    }

    closeModal = () =>{
        this.setState({
            DialogOpen: false
        })
    }

    render() {
        return (
            <div className="product_detail">
                <div className="container">
                    {
                        this.props.products.prodDetail ?
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-lg-4 left">
                                    <img src={Pizza} alt=""/>
                                </div>
                                <div className="col-sm-12 col-md-6 col-lg-8 right">
                                    <ProductInfo
                                        addToCart={(id) => this.addToCartHandler(id)}
                                        detail={this.props.products.prodDetail}
                                    />
                                </div>
                            </div>
                        : 'Loading'
                    }
                </div>
                {
                    this.props.user.userData.isAuth ?
                        this.state.DialogOpen ?
                            <Dialog open={this.state.DialogOpen}>
                                <div className="dialog_alert cart_add_modal">
                                    <h1>Congratulations</h1>
                                    <p> You have successfuly added product to cart</p>
                                    <div className="bottom_btn">
                                        <Link to="/user/cart">View Cart</Link>
                                        <button onClick={this.closeModal}>Continue shoping</button>
                                    </div>
                                </div>
                            </Dialog>
                            : null
                    :
                    <Dialog open={this.state.DialogOpen}>
                        <div className="dialog_alert cart_add_modal">
                            <h1>Sorry</h1>
                            <p> You have to log in first before adding to cart!</p>
                            <div className="bottom_btn">
                                <Link to="/register_login">Log In</Link>
                                <button onClick={this.closeModal}>Close</button>
                            </div>
                        </div>
                    </Dialog>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        products: state.products
    }
}
 
export default connect(mapStateToProps)(ProductPage);