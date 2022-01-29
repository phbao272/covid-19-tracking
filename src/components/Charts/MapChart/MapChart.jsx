import { useState, useEffect, useRef } from 'react';
import React from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HighChartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

const initOptions = {
  chart: {
    height: '500',
    style: {
      fontFamily: 'Roboto',
    }
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, '#FFC4AA'],
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '	#7A0826'],
    ],
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series: [
    {
      name: 'Dân số',
      joinBy: ['hc-key', 'key'],
    },
  ],
};

HighChartsMap(Highcharts)

const MapChart = ({ mapData }) => {
  const [options, setOptions] = useState({})
  const chartRef = useRef()
  const [configLoaded, setConfigLoaded] = useState(false)

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const dataFake = mapData.features.map((feature, index) => ({
        key: feature.properties['hc-key'],
        value: index
      }))

      setOptions({
        ...initOptions,
        series: [
          {
            ...initOptions.series[0],
            mapData: mapData,
            data: dataFake,
          }
        ]
      })

      if (!configLoaded) setConfigLoaded(true)
    }
  }, [mapData, configLoaded])

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData
      })
    }
  }, [mapData])

  if (!configLoaded) return null

  return (
    <HighchartsReact 
      highcharts={Highcharts}
      options={cloneDeep(options)}
      constructorType={'mapChart'}
      ref={chartRef}
    />
  )
};

export default MapChart;
