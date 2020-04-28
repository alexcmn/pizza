import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import FormField from '../utils/form/formFields';
import { update, generateData, isFormValid } from '../utils/form/formActions';
import { loginUser } from '../../actions/user_actions';

class Login extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata:{
            email:{
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            },
            password:{
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter password'
                },
                validation:{
                    required: true
                },
                valid: true,
                touched: true,
                validationMessage: ''
            }
        }
    }

    submitForm = (event) =>{
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'login');
        let formIsValid = isFormValid(this.state.formdata, 'login');

        if(formIsValid){
            // console.log(dataToSubmit)
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.loginSuccess){
                    console.log(response.payload)
                    this.props.history.push('/user/dashboard')
                }else{
                    this.setState({
                        formError: true
                    })
                }
            });
        }else{
            this.setState({
                formError: true
            })
        }
    }

    updateForm = (element) =>{
        const newFormdata = update(element, this.state.formdata, 'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() {
        return (
            <>
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <div className="form-group">
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element)=> this.updateForm(element)}
                        />
                    </div>
                    <div className="form-group">
                        <FormField
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element)=> this.updateForm(element)}
                        />
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
                        <Link to="/register">Don't have an account?</Link>
                        <button onClick={(event)=> this.submitForm(event)} type="submit" className="btn btn-primary">Log In</button>
                    </div>
                </form>
            </>
        );
    }
}

export default connect()(withRouter(Login));