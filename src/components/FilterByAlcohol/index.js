import './index.scss';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import alcoholicOptions from "../../constants/alcoholicOptions";

const FilterByAlcohol = ({ value, onChange }) => {
    return (
        <FormControl className="alcohol-filter__container" component="fieldset">
            <RadioGroup className="alcohol-filter__radio-group" row name="gender1" value={value} onChange={onChange}>
                {alcoholicOptions.map(option => (
                    <FormControlLabel
                        key={option}
                        value={option.replace(' ', '_')}
                        control={<Radio color="default"/>}
                        label={option}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default FilterByAlcohol;