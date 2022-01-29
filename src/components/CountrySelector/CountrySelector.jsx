import { InputLabel, FormControl, NativeSelect, FormHelperText } from '@material-ui/core';
import React, { useEffect } from 'react';

const CountrySelector = ({value, handleOnChange, countries}) => {
    //TODO: Sort Country Selector
    useEffect(() => {
        console.log("Sắp xếp")

        if (countries) {
            countries.sort((a, b) => {
                var textA = a.Country.toUpperCase();
                var textB = b.Country.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; 
            })
        }       
    }, [countries])

    return (
        <FormControl style={{margin: '12px 0'}}>
            <InputLabel htmlFor="country-selector" shrink>Quốc gia</InputLabel>
            <NativeSelect 
                value={value} 
                onChange={handleOnChange}
                inputProps={
                    {
                        name: 'country',
                        id: 'country-selector',
                    }
                }
            > 
            {countries.map((country => (
                <option key={country.ISO2} value={country.ISO2.toLowerCase()}>{country.Country}</option>
            )))}
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    )
}

export default CountrySelector;
