import './index.scss';
import React from 'react';

const Drink = ({ drink, onDrinkClick }) => {
    const { id, image, name } = drink;

    return (
        <div
            key={id}
            className="drink__container"
            onClick={onDrinkClick}
        >
            <img
                src={image}
                alt={name}
                className="drink__img"
            />
            <div className="drink__hover-container">
                <div className="drink__hover-name">
                    {name}
                </div>
            </div>
        </div>
    );
};

export default Drink;