import './index.scss';
import React from 'react';
import Modal from "@material-ui/core/Modal";
import mapMeasuresToIngredients from "../../utils/mapMeasuresToIngredients";

const DrinkModal = ({ drink, onClose }) => {
    const { strDrinkThumb, strDrink, strInstructions } = drink;

    const ingredients = mapMeasuresToIngredients(drink);

    return (
        <Modal
            className="modal"
            open={!!drink}
            onClose={onClose}
            disableAutoFocus
        >
            <div
                className="modal__container"
            >
                <div className="modal__img-container">
                    <img src={strDrinkThumb} alt={strDrink} className="modal__img"/>
                </div>
                <div className="modal__description">
                    <div className="modal__ingredients">
                        <h2 className="modal__drink-name">
                            {strDrink}
                        </h2>
                        <ul>
                            {ingredients.map(([name, measure]) => (
                                <li key={name}><b>{name}</b>: {measure}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal__instruction-container">
                        <p className="modal__instruction">{strInstructions}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DrinkModal;