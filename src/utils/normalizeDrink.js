const normalizeDrink = drink => {
    const ingredientsArray = [];

    Object.entries(drink).forEach(([key, value]) => {
        if (value && key.includes('strIngredient')) {
            const ingredientIndex = key.replace('strIngredient', '');
            const ingredientMeasure = drink['strMeasure' + ingredientIndex];
            ingredientsArray.push([value, ingredientMeasure]);
        }
    });

    return {
        id: drink.idDrink,
        name: drink.strDrink,
        category: drink.strCategory,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb,
        ingredients: ingredientsArray
    }
}

export default normalizeDrink;