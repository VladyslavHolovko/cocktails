import './index.scss';
import React from 'react';

const Drink = ({ drink, onDrinkClick }) => {
    const { idDrink, strDrinkThumb, strDrink } = drink;

    return (
        <div
            key={idDrink}
            className="drink__container"
            onClick={onDrinkClick}
        >
            <img src={strDrinkThumb} alt={strDrink} className="drink__img"/>
            <div className="drink__hover-container">
                <div className="drink__hover-name">
                    {strDrink}
                </div>
            </div>
        </div>
    );
};

export default Drink;