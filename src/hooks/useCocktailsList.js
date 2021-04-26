import { useState } from 'react';
import { getFilteredDrinks, getRandomDrink } from "../api/getRequests";

const useCocktailsList = () => {
    const [cocktailsList, setCocktailsList] = useState([]);

    const addRandomDrink = async () => {
        const newDrink = await getRandomDrink();

        setCocktailsList(state => {
            if (state.some(drink => drink.id === newDrink.id)) {
                addRandomDrink();
                return [...state];
            }

            return [...state, newDrink];
        });
    }

    const loadNewCocktails = async (params = { random: true }) => {
        const { random, refresh } = params;

        if (refresh) {
            setCocktailsList([]);
        }

        if (random) {
            new Array(8).fill(null).forEach(() => addRandomDrink());
            return;
        }

        const drinksList = await getFilteredDrinks(params);

        setCocktailsList(drinksList);
    };

    return [cocktailsList, loadNewCocktails];
}

export default useCocktailsList;