import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';

import FormField from '../utils/form/formFields';
import { update, generateData, isFormValid } from '../utils/form/formActions';
import { registerUser } from '../../actions/user_actions';

class Register extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter name'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter lastname'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter password'
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: true,
                touched: true,
                validationMessage: ''
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'register');
        let formIsValid = isFormValid(this.state.formdata, 'register');

        if (formIsValid) {
            this.props.dispatch(registerUser(dataToSubmit)).then(response =>{
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    })
                    setTimeout(()=>{
                        this.props.history.push('/register_login');
                    },3000)
                }else{
                    this.setState({
                        formError: true
                    })
                }
            }).catch(e=>{
                this.setState({
                    formError: true
                })
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'register');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() {
        return (
            <div className="login">
                <div className="log-wrapper">
                    <div className="top">
                        <h1>Register</h1>
                    </div>
                    <div className="wrapp">
                        <div className="col-12 box">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <div className="form-row first">
                                    <div className="form-group">
                                        <FormField
                                            id={'name'}
                                            formdata={this.state.formdata.name}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <FormField
                                            id={'lastname'}
                                            formdata={this.state.formdata.lastname}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <FormField
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <div className="form-row first">
                                    <div className="form-group">
                                        <FormField
                                            id={'password'}
                                            formdata={this.state.formdata.password}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <FormField
                                            id={'confirmPassword'}
                                            formdata={this.state.formdata.confirmPassword}
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
                                <div className="form-row bottom">
                                    <Link to="/register_login">Already have an account?</Link>
                                    <button onClick={(event)=> this.submitForm(event)} type="submit" className="btn btn-primary">Create an account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <Dialog open={this.state.formSuccess}>
                        <div className="dialog_alert">
                            <h1>Congratulations</h1>
                            <p>You will be redirected to the Login in few seconds...</p>
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default connect()(Register);