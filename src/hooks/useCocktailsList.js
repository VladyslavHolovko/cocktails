import { useState } from 'react';
import { getDrinks } from "../api/getRequest";

const useCocktailsList = () => {
    const [cocktailsList, setCocktailsList] = useState([]);

    const addRandomDrink = async () => {
        const [ newDrink ] = await getDrinks();

        setCocktailsList(state => {
            if (state.some(drink => drink.id === newDrink.id)) {
                addRandomDrink();
                return [...state];
            }

            return [...state, newDrink];
        });
    }

    const loadNewCocktails = async (params = {}) => {
        const { refresh, name, alcohol } = params;

        if (refresh) {
            setCocktailsList([]);
            return;
        }

        if (name || alcohol) {
            const drinksList = await getDrinks(params);

            setCocktailsList(drinksList);
            return;
        }

        new Array(8).fill(null).forEach(() => addRandomDrink());
    };

    return [cocktailsList, loadNewCocktails];
}

export default useCocktailsList;