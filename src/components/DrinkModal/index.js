import './index.scss';
import React, { useEffect, useState } from 'react';
import Modal from "@material-ui/core/Modal";
import fetchDrinkData from "../../utils/fetchDrinkData";

const DrinkModal = ({ drink, onClose }) => {
    const [drinkData, setDrinkData] = useState({ ...drink });

    useEffect(() => {
        if (!!drink && !drink.instructions) {
            fetchDrinkData(drink.id, setDrinkData);
            return;
        }
        setDrinkData({ ...drink });
    }, [drink]);

    const { image, name, instructions, ingredients } = drinkData;

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
                    <img src={image} alt={name} className="modal__img"/>
                </div>
                <div className="modal__description">
                    <h2 className="modal__drink-name">
                        {name}
                    </h2>
                    <div className="modal__ingredients-container">
                        <ul className="modal__ingredients-list">
                            {ingredients?.map(([name, measure]) => (
                                <li key={name}>
                                    <p className="modal__ingredients-item">
                                        <b>{name}</b>{measure && ':'} {measure}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal__instruction-container">
                        <p className="modal__instruction">{instructions}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DrinkModal;