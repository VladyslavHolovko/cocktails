import { useState, useEffect } from 'react';

const useCocktailsList = () => {
    const [cocktailsList, setCocktailsList] = useState([]);

    useEffect(() => {
        loadNewCocktails(4);
    }, []);

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

    const loadDrinksByQuery = async (query) => {
        const drinksList = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(({ drinks }) => drinks || []);

        setCocktailsList(drinksList);
    }

    const loadNewCocktails = (amount = 16, query) => {
        if (!query) {
            for (let i = 1; i <= amount; i++) {
                loadRandomDrink();
            }
            return;
        }

        loadDrinksByQuery(query);
    };

    return [cocktailsList, loadNewCocktails];
}

export default useCocktailsList;