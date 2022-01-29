import { Grid } from '@material-ui/core';
import React from 'react'
import HighlightCard from './HighlightCard';

const Highlight = ({ report }) => {

    const data = report && report.length ? report[report.length - 1] : [];
    
    const summary = [
        {
            title: "Số ca nhiễm",
            count: data?.Confirmed,
            type: "Confirmed"
        },
        {
            title: "Số ca khỏi",
            count: data?.Recovered,
            type: "Recovered"
        },
        {
            title: "Số ca tử vong",
            count: data?.Deaths,
            type: "Deaths"
        }
    ]

    return (
        <Grid container spacing={2}>
            {summary.map(item => (
                <Grid item sm={4} xs={12} key={item.type}>
                    <HighlightCard 
                        title={item.title}
                        count={item.count}
                        type={item.type}
                    />
               </Grid>
            ))}            
        </Grid>
    )
};

export default Highlight;
