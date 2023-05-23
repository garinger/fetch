"use client";

import DogGrid from "@/components/DogGrid";
import Filter from "@/components/Filter";
import axios from "axios";
import { useEffect, useState } from "react";

const client = axios.create({
  withCredentials: true,
  baseURL: "https://frontend-take-home-service.fetch.com",
});

export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export default function Home() {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dogIds, setDogIds] = useState([]);
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    client
      .get("/dogs/search", { params: { breeds: selectedBreeds } })
      .then((res) => {
        setDogIds(res.data.resultIds);
      });
  }, [selectedBreeds]);

  useEffect(() => {
    client.post("/dogs", dogIds).then((res) => {
      setDogs(res.data);
    });
  }, [dogIds]);

  return (
    <main>
      <Filter onBreedsChange={setSelectedBreeds} />
      <DogGrid dogs={dogs} />
    </main>
  );
}
