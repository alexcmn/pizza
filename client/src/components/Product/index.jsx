import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProductDetail, clearProductDetail } from '../../actions/product_actions';
import { addToCart } from '../../actions/user_actions';
import Pizza from '../../Resources/images/pizza2.png'
import ProductInfo from './product_info';

class ProductPage extends Component {
    
    state = {  }
    
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
        this.props.dispatch(addToCart(id))
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