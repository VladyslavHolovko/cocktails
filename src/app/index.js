import './index.scss';
import React, { useEffect, useRef, useState } from "react";
import LocalBarIcon from '@material-ui/icons/LocalBar';
import DrinkModal from "../components/DrinkModal";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import useCocktailsList from "../hooks/useCocktailsList";
import observe from "../utils/observe";
import usePersistedState from "../hooks/usePersistedState";
import CocktailsList from "../components/CocktailsList";

const CocktailsApp = () => {
    const [cocktailsList, setCocktailsList] = useCocktailsList();
    const [modalData, setModalData] = useState(false);
    const [isLazyLoading, setIsLazyLoading] = useState(true);
    const [filterParam, setFilterParam] = usePersistedState('filterParam', { refresh: true })

    useEffect(() => {
        setIsLazyLoading(filterParam.refresh);
        setCocktailsList(filterParam);
    }, [filterParam]);

    const loader = useRef(null);
    useEffect(() => {
        observe(loader.current, setCocktailsList);
    }, []);

    return (
        <div className="cocktails cocktails__container">
            <DrinkModal
                drink={modalData}
                onClose={() => setModalData(false)}
            />
            <div className="cocktails__logo-container">
                <LocalBarIcon
                    className="cocktails__logo"
                    fontSize="small"
                />
            </div>
            <div className="cocktails__filters">
                <Filters
                    onSearch={setFilterParam}
                    setIsLazyLoading={setIsLazyLoading}
                    isFiltered={!isLazyLoading}
                />
            </div>
            <CocktailsList
                cocktailsList={cocktailsList}
                onDrinkClick={setModalData}
            />
            <div
                className="cocktails__loader"
                ref={loader}
                style={{ display: isLazyLoading ? 'block' : 'none' }}
            >
                <Loader/>
            </div>
        </div>
    );
}

export default CocktailsApp;
