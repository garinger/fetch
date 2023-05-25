"use client";

import DogGrid from "@/components/DogGrid";
import Filter from "@/components/Filter";
import LogoutButton from "@/components/LogoutButton";
import MatchButton from "@/components/MatchButton";
import MatchCard from "@/components/MatchCard";
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

type Filters = {
  breeds?: string[];
  locations?: string[];
  minAge?: string;
  maxAge?: string;
};

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    breeds: undefined,
    locations: undefined,
    minAge: undefined,
    maxAge: undefined,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dogIds, setDogIds] = useState([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [matchId, setMatchId] = useState<string[]>([]);
  const [match, setMatch] = useState<Dog>();
  // Pagination
  const [currentPage, setCurrentPage] = useState<string>("/dogs/search");
  const [nextPage, setNextPage] = useState<string>("");
  const [previousPage, setPreviousPage] = useState<string>("");

  const dogsPerPage = 25;

  function fetchDogs() {
    client
      .get(currentPage, {
        params: {
          breeds: filters.breeds,
          zipCodes: filters.locations,
          ageMin: filters.minAge,
          ageMax: filters.maxAge,
        },
      })
      .then((res) => {
        setDogIds(res.data.resultIds);

        if (res.data.resultIds.length < dogsPerPage) {
          setNextPage("");
        } else {
          setNextPage(res.data.next);
        }

        if (res.data.prev) {
          setPreviousPage(res.data.prev);
        } else {
          setPreviousPage("");
        }
      })
      .catch((err) => {
        self.location.href = "/login";
      });
  }

  useEffect(() => {
    setIsLoading(true);

    setNextPage("");
    setPreviousPage("");
    setCurrentPage("/dogs/search");

    fetchDogs();
  }, [filters]);

  useEffect(() => {
    setIsLoading(true);
    fetchDogs();
  }, [currentPage]);

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

  function handlePageChange(next: boolean) {
    if ((next && !nextPage) || (!next && !previousPage)) return;

    if (next) {
      setNextPage("");
      setPreviousPage("");
      setCurrentPage(nextPage);
    } else {
      setNextPage("");
      setPreviousPage("");
      setCurrentPage(previousPage);
    }
  }

  function handleLogout() {
    client.post("/auth/logout").then((res) => {
      self.location.href = "/login";
    });
  }

  function handleFiltersChange(
    filter: string,
    value: string[] | number | string | null
  ) {
    setFilters({
      ...filters,
      [filter]: value,
    });
  }

  function handleCloseMatch() {
    setMatch(undefined);
  }

  return (
    <main className="h-full">
      <LogoutButton onClick={handleLogout} />
      <div className="flex justify-center m-4">
        {match && <MatchCard dog={match} onClose={handleCloseMatch} />}
      </div>
      <MatchButton onClick={handleMatch} disabled={likes.length < 2} />
      <Filter
        onFiltersChange={handleFiltersChange}
        onClearFilters={() =>
          setFilters({
            breeds: undefined,
            locations: undefined,
            minAge: undefined,
            maxAge: undefined,
          })
        }
      />
      {!isLoading ? (
        <div>
          <DogGrid dogs={dogs} likes={likes} onLike={handleLike} />
          {dogs.length > 0 && (
            <Pagination
              onPageChange={handlePageChange}
              nextDisabled={nextPage === ""}
              previousDisabled={previousPage === ""}
            />
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
