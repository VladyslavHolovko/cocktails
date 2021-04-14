import { useState } from 'react';

const useCocktailsList = () => {
    const [cocktailsList, setCocktailsList] = useState([]);

    const loadRandomDrink = async () => {
        const newDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(({ drinks }) => drinks[0]);

        setCocktailsList(state => {
            if (state.some(drink => drink.idDrink === newDrink.idDrink)) {
                loadRandomDrink();
                return [...state];
            }

            return [...state, newDrink];
        });
    };

    const loadDrinksByNameQuery = async (query) => {
        const drinksList = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(({ drinks }) => drinks || []);

        setCocktailsList(drinksList);
    };

    const loadDrinksByAlcohol = async (alcohol) => {
        const drinksList = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`)
            .then(response => response.json())
            .then(({ drinks }) => drinks || []);

        setCocktailsList(drinksList);
    };

    const loadNewCocktails = (params = {}) => {
        const { name, alcohol, refresh } = params;

        if (!name && !alcohol) {
            if (refresh) {
                setCocktailsList([]);
            }

            for (let i = 1; i <= 8; i++) {
                loadRandomDrink();
            }
            return;
        }

        if (name) {
            loadDrinksByNameQuery(name);
            return;
        }

        if (alcohol) {
            loadDrinksByAlcohol(alcohol);
        }
    };

    return [cocktailsList, loadNewCocktails];
}

export default useCocktailsList;