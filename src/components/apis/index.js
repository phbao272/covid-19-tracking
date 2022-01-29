import axios from 'axios'

export const getCountries = () =>
    axios.get('https://api.covid19api.com/countries')

export const getReportByCountry = (nameCountry) =>
    axios.get(`https://api.covid19api.com/dayone/country/${nameCountry}`)

export const getMapDataByCountryId = (countryId) =>
    import(
        `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
    );