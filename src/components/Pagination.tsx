"use client";

import { useState } from "react";

interface Props {
  dogCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ dogCount, onPageChange }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  let pageCount = dogCount / 25;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    onPageChange(page);
  }

  return (
    <div className="btn-group flex justify-center my-12 gap-1">
      <button className="btn w-36">Previous</button>
      <button className="btn w-36">Next</button>
    </div>
  );
}
