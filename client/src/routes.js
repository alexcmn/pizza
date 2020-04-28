import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/Home/index';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';
import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/add_product';
import ProductPage from './components/Product';
import UserCart from './components/User/cart';
import UpdateUserProfile from './components/User/update_profile';

const Routes = () => {
  return (
    <Switch>
      <Layout>
        <Route path="/user/user_profile" exact component={Auth(UpdateUserProfile, true)}/>
        <Route path="/user/cart" exact component={Auth(UserCart, true)}/>
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)}/>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>
        
        <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)}/>
        <Route path="/register" exact component={Auth(Register, false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)}/>
        <Route path="/" exact component={Auth(Home, null)}/>
      </Layout>
    </Switch>
  );
}
 
export default Routes;
