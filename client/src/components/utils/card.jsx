import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import { addToCart } from '../../actions/user_actions';
import Pizza from '../../Resources/images/pizza.png';

class Card extends Component {

    state = {
        DialogOpen: false
    }

    addToCartHandler = () => {
        if (this.props.user.userData.isAuth) {
            this.props.dispatch(addToCart(this.props._id))
            this.setState({
                DialogOpen: true
            })
        } else {
            console.log('You need to sign in first')
        }
    }

    closeModal = () => {
        this.setState({
            DialogOpen: false
        })
    }

    render() {
        const props = this.props;

        return (
            <>
                <div className="wrapp">
                    <img src={Pizza} alt="" />
                    <div className="text">
                        <h3>{props.name}</h3>
                        <p>{props.price}$</p>
                        <div className="btns">
                            <Link to={`/product_detail/${props._id}`}>View Product</Link>
                            <Link className="add" onClick={() => this.addToCartHandler()}>Add to cart</Link>
                        </div>
                    </div>
                </div>
                {
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

                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);