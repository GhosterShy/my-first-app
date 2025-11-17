"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [value, setValue] = useState(q);

  const handleSearch = (e:any) => {
    const text = e.target.value;
    setValue(text);

    const params = new URLSearchParams();
    if (text) params.set("q", text);

    router.push(`/?${params.toString()}`);
  };

  return (
    <form className="d-flex search_div">
      <input
        value={value || ""}
        onChange={handleSearch}
        className="form-control me-2"
        type="search"
        placeholder="Найти..."
        aria-label="Search"
        style={{ border: "none" }}
      />
      <button
        style={{ backgroundColor: "#e04d1cff", border: "none", color: "#fff" }}
        className="btn btn-outline-success"
        type="submit"
      >
        Найти
      </button>
    </form>
  );
}
