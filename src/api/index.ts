import axios from 'axios';

interface CountryData {
    country: string,
    country_abbreviation: string,
    total_cases: string,
    new_cases: string,
    total_deaths:string,
    new_deaths: string,
    total_recovered: string,
    active_cases: string,
    serious_critical: string,
    cases_per_mill_pop: string,
    flag: string
}

export const fetchData = async (country:any) => {
    try {
        let url = '';
        if (country){
            url = `https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=${country}`;
            const {data: {data:{rows, last_update}}} = await axios.get(url);
            const modifiedData = rows.map((countryData: CountryData)=> ({
                confirmed: parseInt(countryData.total_cases.replace(/,/g, '')),
                recovered: parseInt(countryData.total_recovered.replace(/,/g, '')),
                deaths: parseInt(countryData.total_deaths.replace(/,/g, '')),
                date: last_update
            }));

            return  modifiedData[0];
        }
        else{
            url = 'https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats';
            const {data: {data: {total_cases, recovery_cases, death_cases, last_update}}} = await axios.get(url);

            return {
                confirmed: parseInt(total_cases.replace(/,/g, '')),
                recovered: parseInt(recovery_cases.replace(/,/g, '')),
                deaths: parseInt(death_cases.replace(/,/g, '')),
                last_update
            };
        }

    }catch (e) {

    }
};

export const fetchCountryData = async () => {
    try{
        const {data: {data:{rows, last_update}}} = await axios.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=50&order=total_cases&how=desc&page=1');
        const modifiedData1 = rows.map((countryData: CountryData)=> ({
            country: countryData.country,
            country_abbreviation: countryData.country_abbreviation,
            flag: countryData.flag,
            confirmed: parseInt(countryData.total_cases.replace(/,/g, '')),
            recovered: parseInt(countryData.total_recovered.replace(/,/g, '')),
            deaths: parseInt(countryData.total_deaths.replace(/,/g, '')),
            date: last_update
        }));

        modifiedData1.shift();
        return  modifiedData1;
    }catch (e) {

    }
};

export const fetchContriesNames = async () => {
    const {data: {data:{rows, last_update}}} = await axios.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=200&page=1');
    const modifiedData1 = rows.map((countryData: CountryData)=> ({
        country: countryData.country,
        code: countryData.country_abbreviation
    }));

    return  modifiedData1;
};


