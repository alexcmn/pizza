import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProducts } from '../../actions/product_actions';
import CardBlock from '../utils/card_block';

class Home extends Component {
    
    componentDidMount(){
        this.props.dispatch(getProducts());
    }

    render() { 
        return (
            <>
                <CardBlock
                    list={this.props.products.prod}
                />
            </>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);