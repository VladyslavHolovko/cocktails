import './index.scss';
import React from 'react';
import Drink from "../Drink";
import Masonry from "react-responsive-masonry";

const CocktailsList = ({ cocktailsList, onDrinkClick }) => {
    return (
        <Masonry className="cocktails-list" gutter="1rem">
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
        </Masonry>
    );
};

export default CocktailsList;