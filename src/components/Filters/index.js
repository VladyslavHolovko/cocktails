import './index.scss';
import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import FilterByAlcohol from "../FilterByAlcohol";

const Filters = ({ onSearch, setIsLazyLoading, isFiltered }) => {
    const [isFilterByName, setIsFilterByName] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [radioValue, setRadioValue] = useState('');

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

        if (!isFiltered) return;

        onSearch();
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
            {(isFilterByName && inputValue) && (
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
            <div className="filters__icon-button">
                <IconButton
                    color="primary"
                    edge="end"
                    onClick={searchByName}
                >
                    <SearchIcon className="filters__search-icon"/>
                </IconButton>
            </div>
        </div>
    );
};

export default Filters;