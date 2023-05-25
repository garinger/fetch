"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const client = axios.create({
  withCredentials: true,
  baseURL: "https://frontend-take-home-service.fetch.com",
});

let breeds: string[] = [];
client.get("/dogs/breeds").then((response) => {
  breeds = response.data;
});

const states = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" },
];

interface Props {
  onFiltersChange: (
    filter: string,
    value: string[] | number | string | null
  ) => void;
  onClearFilters: () => void;
}

export default function Filter({ onFiltersChange, onClearFilters }: Props) {
  const [breedValue, setBreedValue] = useState<string>("");
  const [locationValue, setLocationValue] = useState<string>("");
  const [minAgeValue, setMinAgeValue] = useState<string>("");
  const [maxAgeValue, setMaxAgeValue] = useState<string>("");
  const [zipCodes, setZipCodes] = useState<string[]>([]);

  useEffect(() => {
    const test = zipCodes.slice(0, 50);
    onFiltersChange("locations", test);
  }, [zipCodes]);

  function handleBreedChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setBreedValue(event.target.value);
    onFiltersChange("breeds", event.target.value);
  }

  function handleLocationChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setLocationValue(event.target.value);
    client
      .post("/locations/search", { states: [event.target.value], size: 10000 })
      .then((res) => {
        setZipCodes(res.data.results.map((location: any) => location.zip_code));
        console.log(res.data);
      });
  }

  function handleMinAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMinAgeValue(event.target.value);
    onFiltersChange("minAge", event.target.value);
  }

  function handleMaxAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMaxAgeValue(event.target.value);
    onFiltersChange("maxAge", event.target.value);
  }

  function handleClearFilters() {
    setBreedValue("");
    setLocationValue("");
    setMinAgeValue("");
    setMaxAgeValue("");
    onClearFilters();
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-3 m-2">
        <label>Breed</label>
        <select
          value={breedValue}
          className="select select-sm select-bordered font-normal lg:select-md"
          onChange={handleBreedChange}
        >
          <option value={""} disabled>
            Select a breed
          </option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <label>Location</label>
        <select
          value={locationValue}
          className="select select-sm select-bordered font-normal lg:select-md"
          onChange={handleLocationChange}
        >
          <option value={""} disabled>
            Select a location
          </option>
          {states.map((state) => (
            <option key={state.name} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </select>
        <label>Age</label>
        <div className="flex justify-center items-center gap-2">
          <input
            value={minAgeValue}
            type="number"
            placeholder="Min yrs."
            className="input input-sm lg:input-md input-bordered w-28"
            onChange={handleMinAgeChange}
          />
          <input
            value={maxAgeValue}
            type="number"
            placeholder="Max yrs."
            className="input input-sm lg:input-md input-bordered w-28"
            onChange={handleMaxAgeChange}
          />
        </div>
        <button className="btn" onClick={handleClearFilters}>
          Clear
        </button>
      </div>
    </>
  );
}
