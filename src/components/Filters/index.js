import './index.scss';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const Filters = ({ onSearch, setIsLazyLoading, isFiltered }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const search = () => {
        onSearch(null, inputValue);
        setIsLazyLoading(!inputValue || false);
    }

    const searchReset = () => {
        setInputValue('');

        if (!isFiltered) return;

        onSearch(16);
        setIsLazyLoading(true);
    }

    const onInputKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();

            search();
        }
    }

    return (
        <div className="filters__container">
            <div className="filters__input">
                <TextField
                    fullWidth
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search by name..."
                    onKeyPress={onInputKeyPress}
                />
            </div>
            {inputValue && (
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
                    onClick={search}
                >
                    <SearchIcon className="filters__search-icon"/>
                </IconButton>
            </div>
        </div>
    );
};

export default Filters;