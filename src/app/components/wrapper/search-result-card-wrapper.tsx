"use client";

import SearchResultCard from "../shared/search-result-card";

export default function SearchResultCardWrapper({ type }: { type: string }) {
  return <SearchResultCard type={type} />;
}
