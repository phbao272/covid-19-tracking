import React, { useState, useEffect, useContext, memo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';
import { CovidContext } from '../../Context/CovidContext'

const generateOptions = (data, typeLineChart) => {
    const categories = data.map(item => moment(item.Date).format('DD/MM/YYYY'))
    let objLineChart = {}

    if (typeLineChart === 'Confirmed')
        objLineChart = { title: 'Tổng ca nhiễm', type: 'Confirmed', color: '#F3585B' }
    else if (typeLineChart === 'Recovered')
        objLineChart = { title: 'Tổng ca khỏi', type: 'Recovered', color: '#28a745' }
    else objLineChart = { title: 'Tổng ca tử vong', type: 'Deaths', color: 'gray' }

    return {
        chart: {
            height: 500,
            style: {
                fontFamily: 'Roboto',
            }
        },
        title: {
            text: objLineChart.title,
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: [objLineChart.color],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: objLineChart.title,
                data: data.map((item) => item[objLineChart.type]),
            },
        ],
    };
}

const types = [
    {
        type: 'all',
        content: 'Tất cả'
    },
    {
        type: '30',
        content: '30 ngày'
    },
    {
        type: '7',
        content: '7 ngày'
    }
]

const LineChart = ({ data }) => {
    const [options, setOptions] = useState({})
    const [reportType, setReportType] = useState('all')
    const { typeLineChart } = useContext(CovidContext)

    useEffect(() => {
        let customData = []
        switch (reportType) {
            case 'all':
                customData = data
                break
            case '30':
                customData = data.slice(data.length - 30)
                break
            case '7':
                customData = data.slice(data.length - 7)
                break
            default:
                customData = data
        }

        setOptions(generateOptions(customData, typeLineChart))
    }, [data, reportType, typeLineChart])

    return (
        <div>
            <ButtonGroup 
                size='small'
                aria-label='small outlined button group'
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '8px'
                }} 
                spacing={1}>
                {types.map(type => (
                    <Button
                        key={type.type}
                        color={type.type === reportType ? "secondary" : ''}
                        onClick={() => setReportType(type.type)}
                    >{type.content}</Button>
                ))}
            </ButtonGroup>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
};

export default memo(LineChart);
