const CountriesList = ({ countries, viewDetail }) => {

  return countries.map(country => (
    <div key={country.name.common}>
      <span>{country.name.common}</span>
      <button onClick={() => viewDetail(country.name.common)}>show</button>
    </div>
  ))
}

export default CountriesList;