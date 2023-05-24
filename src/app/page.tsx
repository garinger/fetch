"use client";

import DogGrid from "@/components/DogGrid";
import Filter from "@/components/Filter";
import LogoutButton from "@/components/LogoutButton";
import MatchButton from "@/components/MatchButton";
import Pagination from "@/components/Pagination";
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dogIds, setDogIds] = useState([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [matchId, setMatchId] = useState<string[]>([]);
  const [match, setMatch] = useState<Dog>();

  useEffect(() => {
    setIsLoading(true);
    client
      .get("/dogs/search", { params: { breeds: selectedBreeds } })
      .then((res) => {
        setDogIds(res.data.resultIds);
      })
      .catch((err) => {
        self.location.href = "/login";
      });
  }, [selectedBreeds]);

  useEffect(() => {
    client.post("/dogs", dogIds).then((res) => {
      setDogs(res.data);
      setIsLoading(false);
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
    if (likes.length < 2) return;

    client.post("/dogs/match", likes).then((res) => {
      setMatchId([res.data.match]);
    });
  }

  function handlePageChange(pageNumber: number) {
    console.log(pageNumber);
  }

  function handleLogout() {
    client.post("/auth/logout").then((res) => {
      self.location.href = "/login";
    });
  }

  return (
    <main>
      <LogoutButton onClick={handleLogout} />
      <Filter onBreedsChange={setSelectedBreeds} />
      <MatchButton onClick={handleMatch} disabled={likes.length < 2} />
      <div className="flex justify-center m-4">
        <h1>{match?.name}</h1>
      </div>
      {!isLoading ? (
        <div>
          <DogGrid dogs={dogs} likes={likes} onLike={handleLike} />
          {dogs.length > 0 && (
            <Pagination dogCount={125} onPageChange={handlePageChange} />
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="btn btn-square loading"></button>
        </div>
      )}
    </main>
  );
}
