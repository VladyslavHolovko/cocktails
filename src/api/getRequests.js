export const getRandomDrink = async () => {
    return await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(({ drinks }) => drinks[0]);
};

export const getFilteredDrinks = async (params) => {
    const { name, alcohol } = params;

    const path = (() => {
            if (name) return `search.php?s=${name}`;

            if (alcohol) return `filter.php?a=${alcohol}`;
    })();

    return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${path}`)
        .then(response => response.json())
        .then(({ drinks }) => drinks || []);
};