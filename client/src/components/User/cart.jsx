import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block';
import { addCheckout, clearCheckout } from '../../actions/payement_actions';
import { getCartItems, removeCartItem, onSuccessBuy, decreaseCartItem, addToCart } from '../../actions/user_actions';
import FormField from '../utils/form/formFields';
import { update, generateData, isFormValid, resetFields } from '../utils/form/formActions';

class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        totalEuro: 0,
        shippingPrice: 5,
        showTotal: false,
        showSuccess: false,
        formError: false,
        formSuccess: false,
        formdata: {
            street: {
                element: 'input',
                value: '',
                config: {
                    name: 'street_input',
                    type: 'text',
                    placeholder: 'Street Address'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            city: {
                element: 'input',
                value: '',
                config: {
                    name: 'city_input',
                    type: 'text',
                    placeholder: 'City'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            zip: {
                element: 'input',
                value: '',
                config: {
                    name: 'zip_input',
                    type: 'text',
                    placeholder: 'ZIP / Postal Code'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            card: {
                element: 'input',
                value: '',
                config: {
                    name: 'card_input',
                    type: 'text',
                    placeholder: 'Credit Card Number'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            expiration: {
                element: 'input',
                value: '',
                config: {
                    name: 'expiration_input',
                    type: 'text',
                    placeholder: 'Expiration Date'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            cvv: {
                element: 'input',
                value: '',
                config: {
                    name: 'cvv_input',
                    type: 'text',
                    placeholder: 'Security Code'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            }
        }
    }

    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;

        if (user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                });

                this.props.dispatch(getCartItems(cartItems, user.userData.cart)).then(() => {
                    if (this.props.user.cartDetail.length > 0) {
                        this.calculateTotal(this.props.user.cartDetail);
                    }
                })
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'checkout');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'checkout');
        let formIsValid = isFormValid(this.state.formdata, 'checkout');

        if (formIsValid) {
            this.props.dispatch(addCheckout(dataToSubmit)).then(()=>{
                if( this.props.payement.addCheckout.success ){
                    this.resetFormHandler();
                }else{
                    this.setState({
                        formError: true
                    })
                }
            })
            console.log(dataToSubmit)
        } else {
            this.setState({
                formError: true
            })
        }

        this.productBuySuccessHandler();
    }

    productBuySuccessHandler = () =>{
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail
        })).then(()=>{
            if(this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
    }

    resetFormHandler = () =>{
        const newFormData = resetFields(this.state.formdata, 'checkout');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        })

        setTimeout(()=>{
            this.setState({
                formSuccess: false
            }, ()=>{
                this.props.dispatch(clearCheckout())
            })
        },2000)
    }

    calculateTotal = (cartDetail) => {
        let total = 0;
        let totalEuro = 0;
        let excgangeRate = 0.92;

        cartDetail.forEach(item => {
            total += (parseInt(item.price, 10) + this.state.shippingPrice) * item.quantity
        });

        totalEuro = (total * excgangeRate).toFixed(2);

        this.setState({
            total,
            totalEuro,
            showTotal: true
        })
    }

    showNoItemMessage = () => (
        <div className="cart_no_items">
            <h1 style={{ textAlign: 'center', color: '#f99d1b' }}>Your cart is empty</h1>
        </div>
    );

    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id)).then(() => {
            if (this.props.user.cartDetail.length <= 0) {
                this.setState({
                    showTotal: false
                })
            } else {
                this.calculateTotal(this.props.user.cartDetail)
            }
        })
    }

    increseItem = (id) => {
        this.props.dispatch(addToCart(id));
        window.location.reload();
    }

    decreseItem = (id) => {
        let obj = this.props.user.cartDetail.find(obj => obj._id == id);
        if(obj.quantity === 1){
            this.removeFromCart(id);
        }else{
            this.props.dispatch(decreaseCartItem(id));
            window.location.reload();
        }
    }

    render() {
        return (
            <UserLayout>
                <div className="cart_dashboard">
                    <h1>My Cart</h1>
                    <div className="user_cart">
                        <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id) => this.removeFromCart(id)}
                            increseItem={(id) => this.increseItem(id)}
                            decreseItem={(id) => this.decreseItem(id)}
                        />
                        {
                            this.state.showTotal ?
                                <div className="cart_total">
                                    <h4>
                                        Shipping: {this.state.shippingPrice} $
                                        {/* / 
                                        { 
                                            (this.state.shippingPrice * 0.92).toFixed(2)
                                        }
                                        &euro; */}
                                    </h4>
                                    <h2>Total amount: {this.state.total} $ / {this.state.totalEuro} &euro;</h2>
                                </div>
                                :
                                this.state.showSuccess ?
                                    <div className="cart_success">
                                        <h1 style={{ textAlign: 'center', color: '#f99d1b' }}>You have completed your order</h1>
                                    </div>
                                    :
                                    this.showNoItemMessage()
                        }
                    </div>
                    {
                        this.state.showTotal ?
                            <div className="checkout_container">
                                <h1>Cart Checkout</h1>
                                <div className="check_wrapp">
                                    <form onSubmit={(event) => this.submitForm(event)}>
                                        <h2>Adress</h2>
                                        <div className="form-row">
                                            <div className="form-group col-4">
                                                <FormField
                                                    id={'street'}
                                                    formdata={this.state.formdata.street}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                            </div>
                                            <div className="form-group col-4">
                                                <FormField
                                                    id={'city'}
                                                    formdata={this.state.formdata.city}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                            </div>
                                            <div className="form-group col-4">
                                                <FormField
                                                    id={'zip'}
                                                    formdata={this.state.formdata.zip}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                            </div>
                                        </div>
                                        <h2>Card Information</h2>
                                        <div className="form-row">
                                            <div className="form-group col-4">
                                                <FormField
                                                    id={'card'}
                                                    formdata={this.state.formdata.card}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                            </div>
                                            <div className="form-group col-4">
                                                <FormField
                                                    id={'expiration'}
                                                    formdata={this.state.formdata.expiration}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                            </div>
                                            <div className="form-group col-4">
                                                <FormField
                                                    id={'cvv'}
                                                    formdata={this.state.formdata.cvv}
                                                    change={(element) => this.updateForm(element)}
                                                />
                                            </div>
                                        </div>
                                        {
                                            this.state.formError ?
                                                <div className="error_label">
                                                    Please check your data
                                                </div>
                                                :
                                                null
                                        }
                                        <button onClick={(event) => this.submitForm(event)} type="submit" className="btn btn-primary">Create</button>
                                    </form>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        payement: state.payement
    }
}

export default connect(mapStateToProps)(UserCart);