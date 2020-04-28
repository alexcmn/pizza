import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addToCart } from '../../actions/user_actions';
import Pizza from '../../Resources/images/pizza.png';

class Card extends Component {
    
    state = {  }

    addToCartHandler = () =>{
        if(this.props.user.userData.isAuth){
            this.props.dispatch(addToCart(this.props._id))
        }else{
            console.log('You need to sign in first')
        }
    }

    render() {
        const props = this.props;

        return (
            <div className="wrapp">
                <img src={Pizza} alt=""/>
                <div className="text">
                    <h3>{props.name}</h3>
                    <p>{props.price}$</p>
                    <div className="btns">
                        <Link to={`/product_detail/${props._id}`}>View Product</Link>
                        <Link className="add" onClick={()=> this.addToCartHandler()}>Add to cart</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.user
    }
}
 
export default connect(mapStateToProps)(Card);