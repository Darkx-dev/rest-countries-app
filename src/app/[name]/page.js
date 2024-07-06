"use client";
import React, { useEffect, useState } from "react";
import { getCountryByFullName } from "@/utils/fetchCountries";
import { useRouter } from "next/navigation";
import Image from "next/image";
import lookup from "country-code-lookup";
import Link from "next/link";
import Loader from "@/components/Loader";

const Country = ({ params }) => {
  const router = useRouter();
  const { name } = params;
  const [country, setCountry] = useState();

  useEffect(() => {
    const fetchCountry = async () => {
      const countryData = await getCountryByFullName(name);
      console.log(countryData);

      setCountry(countryData);
    };
    fetchCountry();
  }, []);

  if (!country) return <Loader />;

  if (country) {
    return (
      <main className="flex min-h-[calc(100vh-96px)] flex-col items-start px-24 pt-20 max-md:pt-10 dark:bg-darkblue-2 max-md:px-4">
        <button
          className="flex items-center gap-2 rounded-md px-8 py-2 shadow-lg dark:bg-darkblue-1"
          onClick={() => router.back()}
        >
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </i>
          <span>Back</span>
        </button>
        {country && (
          <div className="mt-20 max-md:mt-10 flex h-full w-full items-center gap-28 max-lg:flex-col max-md:gap-5">
            <div className="lg:w-1/2" id="flag">
              <Image
                src={country.flags.svg}
                alt="flag"
                height={300}
                width={400}
                priority
                className="w-full bg-[#2b394530] "
              />
            </div>
            <div className="flex h-full flex-col justify-between *:my-5 md:py-10 lg:w-1/2">
              <h1 className="text-3xl font-extrabold">{country.name.common}</h1>
              <div className="flex flex-wrap justify-between [&>ul>li>span]:font-light [&>ul>li]:font-semibold [&>ul]:space-y-2">
                <ul>
                  <li>
                    Native Name:{" "}
                    {country.nativeNames.map((nativeName) => {
                      return (
                        <span key={nativeName.common}>{nativeName.common}</span>
                      );
                    })}
                  </li>
                  <li>
                    Population: <span>{country.population}</span>
                  </li>
                  <li>
                    Region: <span>{country.region}</span>
                  </li>
                  <li>
                    Sub Region: <span>{country.subregion}</span>
                  </li>
                  <li>
                    Capital: <span>{country.capital}</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    Top Level Domain:{" "}
                    {country.tld.map((domain) => {
                      return <span key={domain}>{domain}</span>;
                    })}
                  </li>
                  <li>
                    Currencies:{" "}
                    {country.currencies.map((currency) => {
                      return <span key={currency.name}>{currency.name}</span>;
                    })}
                  </li>
                  <li>
                    Languages:{" "}
                    {country.languages.map((language, _) => {
                      return (
                        <span key={language}>
                          {_ > 0 && ", "}
                          {language}
                        </span>
                      );
                    })}
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-5 font-semibold">
                Border Countries:{" "}
                {country.borders?.map((border, _) => {
                  return (
                    <Link
                      href={lookup.byIso(border).country.toLowerCase()}
                      key={_}
                      className="flex items-center gap-2 rounded-md px-4 py-2 shadow-medium dark:bg-darkblue-1"
                    >
                      {lookup.byIso(border).country}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
};

export default Country;
