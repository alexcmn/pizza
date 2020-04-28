import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header_Footer/Header';
import Footer from '../components/Header_Footer/Footer';
import { logoutUser } from '../actions/user_actions';

class Layout extends Component {

    state = {
        user:[
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log out',
                linkTo: '/user/logout',
                public: false
            }
        ]
    }

    logoutHandler = () =>{
        this.props.dispatch(logoutUser()).then(response=>{
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }

    cartLink = (item, i) =>{
        const user = this.props.user.userData;

        return(
            <li className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length:0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </li>
        )
    }

    defaultLink = (item,i) =>(
        item.name === 'Log out' ? 
            <li key={i} className="logout">
                <a onClick={()=>this.logoutHandler()}>
                    {item.name}
                </a>
            </li>
        :
        <li key={i}>
            <Link to={item.linkTo}>
                {item.name}
            </Link>
        </li>
    )

    showLinks = (type) =>{
        let list = [];

        if(this.props.user.userData){
            console.log(this.props.user.userData)
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item)
                    }
                }else{
                    if(item.name !== 'Log in'){
                        list.push(item)
                    }
                }
            });
        }

        return list.map((item, i)=>{
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i)
            }else{
                return this.cartLink(item,i)
            }
        })
    }

    render() {
        return (
            <div>
                {   window.location.pathname === '/register_login' || 
                    window.location.pathname === '/register' || 
                    window.location.pathname === '/user/dashboard' ||
                    window.location.pathname === '/admin/add_product' ||
                    window.location.pathname === '/user/cart' ||
                    window.location.pathname === '/user/user_profile'
                    ?
                    <>
                        <div className="head">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 left">
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-6 right">
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            {this.showLinks(this.state.user)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <>
                            {this.props.children}
                        </>

                        <div className="lo-footer">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 cred">
                                        <p>Pizza Delivery. All rights reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Header />
                        <div className="page_container">
                            {this.props.children}
                        </div>
                        <Footer />
                    </>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Layout));