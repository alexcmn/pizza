import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const links = [
    {
        name: 'My Account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'User Information',
        linkTo: '/user/user_profile'
    },
    {
        name: 'My Cart',
        linkTo: '/user/cart'
    }
]

const admin = [
    {
        name: 'Add Pizza',
        linkTo: '/admin/add_product'
    }
]

const UserLayout = (props) => {
    
    const generateLinks = (links) =>(
        links.map((item, i)=>(
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        ))
    )

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row user_wrapp">
                    <div className="col-sm-12 col-md-12 col-lg-3 left">
                        <div className="account">
                            <h2>My Account</h2>
                            <div className="links">
                                { generateLinks(links) }
                            </div>
                        </div>
                        {   props.user.userData.isAdmin ?
                            <div className="admin">
                                <h2>Admin</h2>
                                <div className="links">
                                    { generateLinks(admin) }
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-9 right">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>{
    return{
        user: state.user
    }
}
 
export default connect(mapStateToProps)(UserLayout);