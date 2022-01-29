import { useState, useEffect } from "react"
import React from 'react'
import { getCountries, getReportByCountry } from "./components/apis"

import CountrySelector from "./components/CountrySelector/CountrySelector"
import Highlight from "./components/Highlight/Highlight"
import Summary from "./components/Summary/Summary"

import { CovidContext } from "./components/Context/CovidContext"
import moment from "moment"

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState('')
  const [report, setReport] = useState([])
  const [typeLineChart, setTypeLineChart] = useState('Confirmed')

  useEffect(() => {
    getCountries()
      .then(res => {
        setCountries(res.data)
        setSelectedCountryId('vn')
      })

  }, [])

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value)
  }

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId)

      getReportByCountry(Slug)
        .then(res => {
          res.data.pop()
          setReport(res.data)
        })
    }
  }, [selectedCountryId, countries])

  return (
    <CovidContext.Provider value={{ typeLineChart, setTypeLineChart }}>
      <div className="App" style={{ padding: '0px 24px', marginTop: '40px' }}>
        <h1>COVID-19</h1>
        <p>{moment().format('LLL')}</p>
        <CountrySelector
          countries={countries}
          handleOnChange={handleOnChange}
          value={selectedCountryId}
        />
        <Highlight report={report} />
        <Summary
          report={report}
          selectedCountryId={selectedCountryId}
        />
      </div>
    </CovidContext.Provider>
  )
}

export default App;
