import React, {Component} from "react";
import {Cards, Chart, ContryPicker} from "./components";
import {fetchData} from './api';
import image from './images/image.png';
let style = require('./App.module.css');

class App extends Component<any, any> {
    state = {
        data: {},
        country: '',
    };

    async componentDidMount() {
        const fetchedData = await fetchData(null);
        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country: string) => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country})
    };

    render() {
        const {data, country} = this.state;
        return (
            <div className={style.container}>
                <img src={image} className={style.image} alt="Covid-19"/>
                <Cards data={data}/>
                <ContryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App