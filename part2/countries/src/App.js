import axios from "axios";
import React, { useState, useEffect } from 'react';
import CountriesDetails from "./components/CountriesDetails";
import CountriesList from "./components/CountriesList";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if(searchValue === "") return ;

    axios.get(`https://restcountries.com/v3.1/name/${searchValue}`).then(({ data }) => setCountries(data)).catch(error => console.log(error));

  }, [searchValue]);

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
  };

  return (
      <div className="container">
        <div className="search">
          <span>find countries </span>
          <input type="text" name="search" id="search" onChange={handleSearch} value={searchValue} />
        </div>
        {
          countries.length === 1
            ? <CountriesDetails details={countries} />
            : countries.length > 10
              ? <p>Too many matches, specify another filter</p>
              : <CountriesList countries={countries} viewDetail={setSearchValue} />
        }
      </div>
  )
};
export default App;
