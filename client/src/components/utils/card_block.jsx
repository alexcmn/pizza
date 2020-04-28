import React from 'react';
import Wave from '../../Resources/images/wave.png';
import Card from './card';

const CardBlock = (props) => {

    const renderCards = () =>(
        props.list ?
            props.list.map((card, i)=>(
                <div className="col-sm-12 col-md-6 col-lg-3 box" key={i}>
                    <Card {...card}/>
                </div>
            ))
        : null
    )

    return (
        <div className="shop">
            <img className="wave" src={Wave} />
                <div className="container">
                    <h1>Choose your taste of the day</h1>
                    <div className="row">
                        { renderCards(props.list)}
                    </div>
                </div>
        </div>
    );
}

export default CardBlock;