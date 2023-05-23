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
  const [likes, setLikes] = useState<string[]>([]);
  const [matchId, setMatchId] = useState<string[]>([]);
  const [match, setMatch] = useState<Dog>();

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

  useEffect(() => {
    client.post("/dogs", matchId).then((res) => {
      setMatch(res.data[0]);
    });
  }, [matchId]);

  function handleLike(id: string) {
    if (likes.includes(id)) {
      setLikes(likes.filter((like) => like !== id));
    } else {
      setLikes([...likes, id]);
    }
  }

  function handleMatch() {
    client.post("/dogs/match", likes).then((res) => {
      setMatchId([res.data.match]);
    });
  }

  return (
    <main>
      <div className="flex justify-center m-4">
        <h1>{match?.name}</h1>
      </div>
      <div className="flex justify-center m-8 gap-2">
        <Filter onBreedsChange={setSelectedBreeds} />
        <button className="btn btn-primary" onClick={handleMatch}>
          Match
        </button>
      </div>
      <DogGrid dogs={dogs} likes={likes} onLike={handleLike} />
    </main>
  );
}
