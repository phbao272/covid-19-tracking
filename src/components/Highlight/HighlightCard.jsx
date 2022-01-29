import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React from 'react'
import { useContext } from 'react'
import { CovidContext } from '../Context/CovidContext'
import CountUp from 'react-countup' 

const useStyles = makeStyles({
    wrapper: (props) => {
        switch (props.type) {
            case 'Confirmed':
                return { borderLeft: '5px solid #c9302c' }
            case 'Recovered':
                return { borderLeft: '5px solid #28a745' }
            case 'Deaths':
                return { borderLeft: '5px solid gray' }
            default:
                return {}
        }
    },
    title: {
        fontSize: '18px', marginBottom: '12px'
    },
    count: {
        fontWeight: 'bold', fontSize: '16px'
    }
})

const HighlightCard = ({ title, count, type }) => {
    const style = useStyles({ type })

    const { setTypeLineChart } = useContext(CovidContext)

    return (
        <Card 
            className={style.wrapper} 
            style={{cursor: "pointer"}}
            onClick={() => setTypeLineChart(type)}    
        >
            <CardContent>
                <Typography className={style.title} component="p" variant="body2">{title}</Typography>
                <Typography className={style.count} component="span" variant="body2">
                    <CountUp end={count} duration={2} separator=' '/>
                </Typography>
            </CardContent>
        </Card>
    )
};

export default HighlightCard;
