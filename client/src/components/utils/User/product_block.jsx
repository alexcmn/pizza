import React from 'react';

import Pizza from '../../../Resources/images/pizza.png';

const UserProductBlock = ({products, removeItem, increseItem, decreseItem}) => {
    
    const renderItems = () =>(
        products.cartDetail ?
            products.cartDetail.map(product => (
                <div className="product_block" key={product._id}>
                    <div className="item">
                        <div className="image">
                            <img src={Pizza} alt=""/>
                        </div>
                    </div>
                    <div className="item">
                        <h4>Product Name</h4>
                        <p>{product.name}</p>
                    </div>
                    <div className="item">
                        <h4>Quantity</h4>
                        <p>{product.quantity}</p>
                    </div>
                    <div className="item">
                        <h4>Price</h4>
                        <p>{product.price} $</p>
                    </div>
                    <div className="item btn">
                        <span onClick={()=>decreseItem(product._id)}>-</span>
                        <div className="cart_remove_btn" onClick={()=>removeItem(product._id)}>
                            Remove
                        </div>
                        <span onClick={()=>increseItem(product._id)}>+</span>
                    </div>
                </div>
            ))
        : null
    )
    
    return (
        <div className="wrapper">
            {renderItems()}
        </div>
    );
}
 
export default UserProductBlock;