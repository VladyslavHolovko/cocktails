const mapMeasuresToIngredients = (drink) => {
    const ingredientsArray = [];

    if (!drink.strIngredient1) {
        return ingredientsArray;
    }

    Object.entries(drink).forEach(([key, value]) => {
        if (value && key.includes('strIngredient')) {
            const ingredientIndex = key.replace('strIngredient', '');
            const ingredientMeasure = drink['strMeasure' + ingredientIndex];
            ingredientsArray.push([value, ingredientMeasure]);
        }
    })

    return ingredientsArray;
}

export default mapMeasuresToIngredients;