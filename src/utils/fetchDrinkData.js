import normalizeDrink from "./normalizeDrink";

const fetchDrinkData = async (id, callback) => {
    const drink = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(({ drinks }) => drinks[0])
        .then(normalizeDrink);

    callback(drink);
}

export default fetchDrinkData;