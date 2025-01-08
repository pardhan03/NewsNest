import { useCallback, useState } from "react";
import CountryList from "../constants/CountryList";

export const useNewCountries = () => {
  const [newsCountries, setNewsCountries] = useState(CountryList);
  const toggleNewCountry = useCallback((code) => {
    setNewsCountries((prev) => {
      return prev.map((country) => {
        if (country.code === code) {
          return {
            ...country,
            selected: !country.selected,
          };
        }
        return country;
      });
    });
  }, []);
  return {
    newsCountries,
    toggleNewCountry,
  };
};
