import { Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import LineChart from '../Charts/LineChart/LineChart'
import MapChart from '../Charts/MapChart/MapChart'
import { getMapDataByCountryId } from '../apis'

const Summary = ({ report, selectedCountryId }) => {
    const [mapData, setMapData] = useState({})

    useEffect(() => {
        console.log("Data: ", report)
    })

    useEffect(() => {
        getMapDataByCountryId(selectedCountryId)
            .then(res => setMapData(res))  
    }, [selectedCountryId])

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineChart data={ report }/>
            </Grid>
            <Grid item sm={4} xs={12}>
                <MapChart mapData={ mapData }/>
            </Grid>
        </Grid>
    )
};

export default Summary;
