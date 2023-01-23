import type { Component } from "solid-js";

const SearchIcon: Component = () => {
  return (
    <svg
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 right-0 my-auto mr-6 flex h-5 w-5 text-purple-light"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  );
};

export default SearchIcon;
