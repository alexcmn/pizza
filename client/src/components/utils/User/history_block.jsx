import React from 'react';
import moment from 'moment';

const HistoryBlock = (props) => {
    
    const renderBlocks = () =>(
        props.products ?
            props.products.map((product, i) =>(
                <tr key={i}>
                    <td>{moment(product.dateOfPurchase).format("DD-MM-YYYY")}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price} $</td>
                </tr>
            ))
        : null
    )

    return (
        <div className="history_wrapp">
            <table>
                <thead>
                    <tr>
                        <th>Date of purchase</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
      );
}
 
export default HistoryBlock;