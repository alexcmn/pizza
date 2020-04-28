import React from 'react';

import { Link } from 'react-router-dom';


const Button = (props) => {
    
    const buttons = () => {
        let template = '';

        switch(props.type){
            case "default":
                template = <Link
                    // className={!props.altClass ? 'link_default' : props.altClass}
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>
            break;
            case "bag_link":
                template = 
                    <div className="bag_link"
                        onClick={()=>{
                            props.runAction();
                        }}
                    >
                        Shoping Bad
                    </div>
            break;
            case "add_to_cart_link":
                template =
                    <div className="add_to_cart_link"
                        onClick={()=>{
                            props.runAction()
                        }}
                    >
                        Add To Cart
                    </div>
            
            break;
            default:
                template = ''
        }
    }
    
    return (
        <>
            {buttons()}
        </>
    );
}
 
export default Button;