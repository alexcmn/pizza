import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import UserLayout from '../../../hoc/user';
import FormField from '../../utils/form/formFields';
import { update, generateData, isFormValid, resetFields } from '../../utils/form/formActions';
import { addProduct, clearProduct } from '../../../actions/product_actions';

class AddProduct extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter description'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'text',
                    placeholder: 'Enter price'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available',
                    name: 'available_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
        }
    }

    resetFormHandler = () =>{
        const newFormData = resetFields(this.state.formdata, 'products');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        })

        setTimeout(()=>{
            this.setState({
                formSuccess: false
            }, ()=>{
                this.props.dispatch(clearProduct())
            })
        },2000)
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'products');
        let formIsValid = isFormValid(this.state.formdata, 'products');

        if (formIsValid) {
            this.props.dispatch(addProduct(dataToSubmit)).then(()=>{
                if( this.props.products.addProduct.success){
                    this.resetFormHandler();
                }else{
                    this.setState({
                        formError: true
                    })
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'products');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() {
        return (
            <UserLayout>
                <div className="add_product">
                    <h1>Add New Pizza</h1>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className="form-group">
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="form-group">
                            <FormField
                                id={'description'}
                                formdata={this.state.formdata.description}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="form-group">
                            <FormField
                                id={'price'}
                                formdata={this.state.formdata.price}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="form-group">
                            <FormField
                                id={'shipping'}
                                formdata={this.state.formdata.shipping}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="form-group">
                            <FormField
                                id={'available'}
                                formdata={this.state.formdata.available}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        {   
                            this.state.formSuccess ?
                                <Dialog open={this.state.formSuccess}>
                                    <div className="dialog_alert">
                                        <h1>Congratulations</h1>
                                        <p> You have successfuly added new pizza</p>
                                    </div>
                                </Dialog>
                            : null

                        }
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
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(AddProduct);