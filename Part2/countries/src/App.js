import {useEffect, useState} from "react";
import axios from "axios";
import DisplayCountry from "./components/DisplayCountry";

function App() {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [findCountries, setFindCountries] = useState("");

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
      })
  }, []);
 
  const handleQuery = (event) => {
    setFindCountries(event.target.value)
    const filter = []
    if (countries.length !== 0 && event.target.value !== "") {
      countries.forEach((item) => {
        if (item.name.common.toUpperCase().includes(event.target.value.toUpperCase())) {
          filter.push(item)
        }})
      setFilteredCountries(filter)
      }    
  }

  const ShowCountry = (country) => {
    setFilteredCountries([country])
  }

  const DisplayList = ({countries}) => {
    return(<>
      {countries.map((country) => {
        return(
          <div key={country.name.common}>
            {country.name.common} 
            <button onClick={() => ShowCountry(country)}>show</button>
          </div>
        )
      })}
    </>)
  }

  const Display = () => {
    if (countries.length === 0 || findCountries === "") {return null}
    if (filteredCountries.length === 1) {
      return (
        <DisplayCountry country={filteredCountries} apikey={api_key}/>
      )
    }
    if (filteredCountries.length < 10) {
      return (
        <DisplayList countries={filteredCountries}/>
      )
    }
    if (filteredCountries.length > 10) {
      return(
        <p>Too manu matches, specify another filter</p>
      )
    }
    else {
      return null
    }
  }


  return (<div>
      find countries
      <input type="text" value={findCountries} onChange={handleQuery}/>
      <Display/>
  </div>);
}

export default App;
