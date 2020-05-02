import React, {useState, useEffect} from "react";
import {fetchCountryData} from "../../api";
import {Line, Bar} from 'react-chartjs-2';

const styles = require('./Chart.module.css');

interface CountryData {
    country: string,
    country_abbreviation: string,
    confirmed: string,
    new_cases: string,
    deaths:string,
    new_deaths: string,
    recovered: string,
    active_cases: string,
    serious_critical: string,
    cases_per_mill_pop: string,
    flag: string
}

const  Chart = ({data:{confirmed, recovered, deaths}, country}: any) => {
    const [countryData, setCountryData] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchAPI = async () => {
        const data = await fetchCountryData();
        setCountryData(data);
        setDataReady(true);
    };

    useEffect(()=>{
        fetchAPI();

    }, []);

    const lineChart = (dataReady ? (<Line data={{
        labels: countryData.map((country:CountryData)=>country.country),
        datasets: [{
            data: countryData.map(({confirmed}:CountryData)=>confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true
        }, {
            data: countryData.map(({deaths}:CountryData)=>deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true
        }]
    }}/>) : null);

    const barChart = (
        dataReady ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets:[{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5',
                            'rgba(0,255,0,0.5',
                            'rgba(255,0,0,0.5',
                        ],
                        data:[confirmed, recovered, deaths]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current state in ${country}`},
                }}
            />
        ) : null
    );

    return(
        <div className={styles.chart_container}>
            {country? barChart : lineChart}
        </div>
    )
};

export default Chart