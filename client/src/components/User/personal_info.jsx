import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import FormField from '../utils/form/formFields';
import { update, generateData, isFormValid, populateFields } from '../utils/form/formActions';
import { updateUserData, clearUpdateUser } from '../../actions/user_actions';

class PersonalInfo extends Component {

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
            }
        }
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'update_user_info');
        let formIsValid = isFormValid(this.state.formdata, 'update_user_info');

        if (formIsValid) {
            this.props.dispatch(updateUserData(dataToSubmit)).then(()=>{
                if(this.props.user.updateUser.success){
                    this.setState({
                        formSuccess: true
                    }, ()=>{
                        setTimeout(() => {
                            this.props.dispatch(clearUpdateUser());
                            this.setState({
                                formSuccess: false
                            })
                        }, 2000);
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
        const newFormdata = update(element, this.state.formdata, 'update_user_info');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    componentDidMount(){
        const newFormData = populateFields(this.state.formdata, this.props.user.userData);
        this.setState({
            formdata: newFormData
        })
    }

    render() {
        return (
            <div className="add_product">
                <h1>Update Personal Info</h1>
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
                            id={'lastname'}
                            formdata={this.state.formdata.lastname}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div className="form-group">
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    {
                        this.state.formSuccess ?
                            <Dialog open={this.state.formSuccess}>
                                <div className="dialog_alert">
                                    <h1>Congratulations</h1>
                                    <p> You have successfuly updated your profile</p>
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
                    <button onClick={(event) => this.submitForm(event)} type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PersonalInfo);