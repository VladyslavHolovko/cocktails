import './index.scss';
import React from 'react';
import Drink from "../Drink";

const CocktailsList = ({ cocktailsList, onDrinkClick }) => {
    return (
        <div className="cocktails-list">
            {cocktailsList.length ?
                cocktailsList.map(drink => (
                    <Drink
                        key={drink.id}
                        drink={drink}
                        onDrinkClick={() => onDrinkClick(drink)}
                    />
                ))
                :
                <p className="cocktails-list__empty">Nothing was found...</p>
            }
        </div>
    );
};

export default CocktailsList;