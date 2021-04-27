import normalizeDrink from "../utils/normalizeDrink";

export const getDrinks = async (params = {}) => {
    const path = (() => {
        const { name, alcohol } = params;

        if (name) return `search.php?s=${name}`;

        if (alcohol) return `filter.php?a=${alcohol}`;

        return 'random.php';
    })();

    return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${path}`)
        .then(response => response.json())
        .then(({ drinks }) => (drinks || []).map(normalizeDrink));
};