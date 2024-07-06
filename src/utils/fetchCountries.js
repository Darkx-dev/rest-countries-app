import axios from "axios";

const apiUrl = "https://restcountries.com/v3.1";

import { toArray } from "./customMethods";

const getAllContries = async () => {
  const url = `${apiUrl}/all/`;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};

const getAllCountriesByRegion = async (region) => {
  // https://restcountries.com/v3.1/region/asia
  const url = `${apiUrl}/region/${region}`;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};

const getCountryByFullName = async (fullName) => {
  // https://restcountries.com/v3.1/name/india?fullText=true
  const url = `${apiUrl}/name/${fullName}?fullText=true`;
  const response = await axios.get(url);
  const data = response.data[0];

  let countryData = {
    name: data.name,
    nativeNames: toArray(data.name.nativeName),
    flags: data.flags,
    tld: data.tld,
    population: data.population,
    region: data.region,
    subregion: data.subregion,
    capital: data.capital[0],
    currencies: toArray(data.currencies),
    languages: toArray(data.languages),
    borders: data.borders,
  };
  // console.log(countryData);
  return countryData;
};

export { getAllContries, getCountryByFullName, getAllCountriesByRegion };
