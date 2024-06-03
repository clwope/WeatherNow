import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            console.log(city.latitude, city.longitude)
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '5px',
        border: '2px solid #ccc',
        boxShadow: state.isFocused ? '0 0 0 2px red' : null,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'red' : null,
        color: state.isFocused ? 'white' : null,
    }),
}

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={customStyles}
      className="trt"
    />
  );
};

export default Search;
