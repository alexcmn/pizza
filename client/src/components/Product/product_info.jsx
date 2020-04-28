import React from 'react';
import Button from '../utils/button';

import Truck from '../../Resources/images/truckO.png';
import Tick from '../../Resources/images/tickO.png';
import Cross from '../../Resources/images/closeO.png'

const ProductInfo = (props) => {

    const showProdTags = (detail) => (
        <div className="product_tags">
            {
                detail.shipping ?
                    <div className="tag">
                        <img src={Truck} alt="" />
                        <div className="text">
                            <p>Shipping</p>
                        </div>
                    </div>
                    : null
            }
            {
                detail.available ?
                    <div className="tag">
                        <img src={Tick} alt="" />
                        <div className="text">
                            <p>Available</p>
                        </div>
                    </div>
                :
                    <div className="tag">
                        <img src={Cross} alt="" />
                        <div className="text">
                            <p>Not Available</p>
                        </div>
                    </div>
            }
        </div>
    )

    const showProdActions = (detail) =>(
        <div className="product_actions">
            <h1>{detail.price}$ / {(detail.price * 0.92).toFixed(2)} &euro;</h1>
            <div className="cart">
                <button 
                    onClick={()=>{
                        props.addToCart(detail._id)
                    }}
                >
                    Add To Cart
                </button>
            </div>
        </div>
    )

    const detail = props.detail;
    return (
        <div className="wrapp">
            <h1>{detail.name}</h1>
            <div className="desc">
                <p>{detail.description}</p>
            </div>
            {showProdTags(detail)}
            {showProdActions(detail)}
        </div>
    );
}

export default ProductInfo;