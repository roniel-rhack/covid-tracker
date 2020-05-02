import React, {useState, useEffect} from "react";
import {NativeSelect, FormControl, TextField} from "@material-ui/core";
import {fetchContriesNames} from "../../api";
import Autocomplete from '@material-ui/lab/Autocomplete';

const style = require('./CountryPicker.module.css');

interface Country {
    country: string,
    code: string
}

function countryToFlag(isoCode: string) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const  ContryPicker = ({handleCountryChange}: any) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const [value, setValue] = React.useState<Country|null>({country:'World', code:''});
    useEffect(()=>{
        const fetchCountries = async () => {
            setFetchedCountries(await fetchContriesNames());
        };
        fetchCountries();
    },[]);
    /*return(
        <FormControl>
            <NativeSelect defaultValue="" onChange={(e)=> handleCountryChange(e.target.value)}>
                {fetchedCountries.map((country, i)=><option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )*/
    return(
        <FormControl className={style.formControl}>
            <Autocomplete
                id="combo-box-demo"
                value={value}
                options={fetchedCountries as Country[]}
                getOptionLabel={(option:Country) => option.country}
                onChange={(event: any, newValue: Country | null) => {
                    if (newValue){
                        setValue(newValue);
                        handleCountryChange(newValue.country);
                    }
                    else{
                        setValue({country:'World', code:''});
                        handleCountryChange(null);
                    }

                }}
                style={{ width: 300 }}
                renderOption={(option:Country) => (
                    <React.Fragment>
                        <span>{countryToFlag(option.code)}</span>
                        {option.country}
                    </React.Fragment>
                )}
                renderInput={(params:any) => <TextField {...params} label="Combo box" variant="outlined" inputProps={{
                    ...params.inputProps,}} />}
            />
        </FormControl>
    )
};

export default ContryPicker