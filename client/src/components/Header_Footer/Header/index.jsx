import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../../actions/user_actions';
import Wave from '../../../Resources/images/wave.png'

class Header extends Component {

    state = {
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
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

    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response => {
            if (response.payload.success) {
                this.props.history.push('/')
            }
        })
    }

    cartLink = (item, i) => {
        const user = this.props.user.userData;

        return (
            <li className="nav-item cart_link" key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </li>
        )
    }

    defaultLink = (item, i) => (
        item.name === 'Log out' ?
            <li key={i} className="logout" className="nav-item">
                <a onClick={() => this.logoutHandler()} className="nav-link">
                    {item.name}
                </a>
            </li>
            :
            <li className="nav-item" key={i}>
                <Link to={item.linkTo} className="nav-link">
                    {item.name}
                </Link>
            </li>
    )

    showLinks = (type) => {
        let list = [];

        if (this.props.user.userData) {
            type.forEach((item) => {
                if (!this.props.user.userData.isAuth) {
                    if (item.public === true) {
                        list.push(item)
                    }
                } else {
                    if (item.name !== 'Log in') {
                        list.push(item)
                    }
                }
            });
        }

        return list.map((item, i) => {
            if (item.name !== 'My Cart') {
                return this.defaultLink(item, i)
            } else {
                return this.cartLink(item, i)
            }
        })
    }

    render() {
        return (
            <div className="nav-bann">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="index.html">
                        pizza
                    </a>
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav link">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            {this.showLinks(this.state.user)}
                        </ul>
                    </div>
                </nav>
                <div className="banner">
                    <div className="banner-bx">
                        <div className="text">
                            <h1>Pizza Delivery.</h1>
                            <p>Want to enjoy in best quality and taste of all various pizzas? Go and check out what we have to
                            offer, simply add and order, and your pizza will come to your door.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sequi iste tenetur tempora beatae
                            blanditiis optio quasi nulla magni ex nostrum deleniti exercitationem dicta veritatis molestiae
                            libero quaerat laboriosam eaque!
                            </p>
                        </div>
                    </div>
                </div>
                <img className="wave" src={Wave} alt="" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);