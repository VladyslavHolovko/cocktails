import './index.scss';
import React, { useEffect } from 'react';
import usePersistedState from "../../hooks/usePersistedState";
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import FilterByAlcohol from "../FilterByAlcohol";

const Filters = ({ onSearch, setIsLazyLoading, isFiltered }) => {
    const [isFilterByName, setIsFilterByName] = usePersistedState('isFilterByName', '');
    const [inputValue, setInputValue] = usePersistedState('inputValue', '');
    const [radioValue, setRadioValue] = usePersistedState('radioValue', '');

    useEffect(() => {
        if (inputValue) {
            searchByName();
            return;
        }
        if (radioValue) {
            searchByAlcohol(radioValue);
            return;
        }
        onSearch();
    }, []);

    const toggleActiveFilters = () => {
        setIsFilterByName(state => !state);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const searchByName = () => {
        onSearch({ name: inputValue });

        setRadioValue('');
        setIsLazyLoading(false);
    };

    const onInputKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            searchByName();
        }
    };

    const searchReset = () => {
        setInputValue('');
        setRadioValue('');

        if (!isFiltered) return;

        onSearch({ refresh: true });
        setIsLazyLoading(true);
    };

    const searchByAlcohol = (radioValue) => {
        onSearch({ alcohol: radioValue });

        setInputValue('');
        setIsLazyLoading(false);
    };

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);

        searchByAlcohol(event.target.value);
    };

    return (
        <div className="filters__container">
            <div className="filters__icon-button">
                <Tooltip title="Change filters">
                    <IconButton
                        color="primary"
                        edge="start"
                        onClick={toggleActiveFilters}
                    >
                        <SwapVertIcon className="filters__swap-icon"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="filters__input">
                {isFilterByName ?
                    <TextField
                        fullWidth
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search by name..."
                        onKeyPress={onInputKeyPress}
                    />
                    :
                    <FilterByAlcohol
                        value={radioValue}
                        onChange={handleRadioChange}
                    />
                }
            </div>
            {(isFilterByName ? inputValue : radioValue) && (
                <div className="filters__icon-button">
                    <IconButton
                        color="primary"
                        edge="end"
                        onClick={searchReset}
                    >
                        <ClearIcon className="filters__search-icon"/>
                    </IconButton>
                </div>
            )}
            {isFilterByName && (
                <div className="filters__icon-button">
                    <IconButton
                        color="primary"
                        edge="end"
                        onClick={searchByName}
                    >
                        <SearchIcon className="filters__search-icon"/>
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default Filters;