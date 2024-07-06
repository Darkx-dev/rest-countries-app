"use client";
import { useEffect, useState, useMemo, Suspense } from "react";
import Search from "@/components/Search";
import { useSearchParams } from "next/navigation";
import { getAllCountriesByRegion } from "@/utils/fetchCountries";
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import Filter from "@/components/Filter";

const Home = () => {
  const params = useSearchParams();
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [region, setRegion] = useState("asia");

  const fetchData = useMemo(
    () => async (region) => {
      try {
        const countriesData = await getAllCountriesByRegion(region);
        setCountries(countriesData);
        if (params.get("search")) {
          console.log("Searching countries");
          const searchQuery = params.get("search");
          console.log(searchQuery);
          handleSearchFilter(searchQuery, countriesData);
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    [],
  );

  const handleSearchFilter = (filter, countryData = null) => {
    let tempData = countryData ? countryData : countries;
    console.log(tempData);
    if (!filter) return setFilteredCountries(null);
    if (filter) {
      tempData = tempData.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()),
      );
    }
    // console.log(tempData);
    setFilteredCountries(tempData);
  };

  const handleRegionFilter = (region) => {
    setRegion(region);
    console.log("Region filter started");
    // handleSearchFilter(null);
  };

  useEffect(() => {
    fetchData(region);
  }, [region]);

  if (!countries) return <Loader />;
  return (
    <div className="min-h-[calc(100vh-96px)] px-24 py-10 shadow-xl dark:bg-darkblue-2 max-sm:px-4">
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
        <Search filterCountry={handleSearchFilter} />
        <Filter filterRegion={handleRegionFilter} />
      </div>
      <div className="grid grid-cols-4 items-center gap-16 pt-10 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {countries &&
          (filteredCountries ? filteredCountries : countries).map(
            (country, _) => {
              const { common } = country.name;
              const { population, region, capital } = country;
              const { png, svg } = country.flags;
              return (
                <Card
                  key={_}
                  idx={_}
                  name={common}
                  population={population}
                  region={region}
                  image={png || svg}
                  capital={capital}
                />
              );
            },
          )}
      </div>
    </div>
  );
};

export default Home;
