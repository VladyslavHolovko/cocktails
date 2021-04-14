import './index.scss';
import React, { useEffect, useRef, useState } from "react";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import Drink from "../components/Drink";
import DrinkModal from "../components/DrinkModal";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import useCocktailsList from "../hooks/cocktailsList";
import observe from "../utils/observe";

const CocktailsApp = () => {
    const [cocktailsList, loadNewCocktails] = useCocktailsList();
    const [modalData, setModalData] = useState(false);
    const [isLazyLoading, setIsLazyLoading] = useState(true);

    const loader = useRef(null);
    useEffect(() => {
        observe(loader.current, loadNewCocktails);
    }, []);

    return (
        <div className="cocktails cocktails__container">
            <div className="cocktails__logo-container">
                <LocalBarIcon
                    className="cocktails__logo"
                    fontSize="small"
                />
            </div>
            <DrinkModal
                drink={modalData}
                onClose={() => setModalData(false)}
            />
            <div className="cocktails__filters">
                <Filters
                    onSearch={loadNewCocktails}
                    setIsLazyLoading={setIsLazyLoading}
                    isFiltered={!isLazyLoading}
                />
            </div>
            <div className="cocktails__list">
                {cocktailsList.map(drink => (
                    <Drink
                        key={drink.idDrink}
                        drink={drink}
                        onDrinkClick={() => setModalData(drink)}
                    />
                ))}
            </div>
            <div
                className="cocktails__loader"
                ref={loader}
                style={{display: isLazyLoading ? 'block' : 'none'}}
            >
                <Loader/>
            </div>
        </div>
    );
}

export default CocktailsApp;
