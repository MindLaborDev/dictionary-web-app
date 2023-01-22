import { Component, createSignal, For } from "solid-js";
import Meaning from "./Meaning";

const Search: Component = (props) => {
  const hashSearch = location.hash.replace("#", "");
  if (hashSearch) {
    searchForWord(hashSearch);
  }

  const [search, setSearch] = createSignal(hashSearch);
  const [searchResults, setSearchResults] = createSignal(null);

  function handleSearch(event: Event) {
    event.preventDefault();
    location.href = `#${search()}`;
    searchForWord(search());
  }

  function searchForWord(word: string) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then((respose) => {
      if (respose.ok) {
        respose.json().then((data) => {
          setSearchResults(data);
          console.log(data);
        });
      } else if (respose.status === 404) {
        console.log("not found error");
      } else {
        console.log("something went wrong");
      }
    });
  }

  return (
    <section class="mt-14 w-full">
      <form onSubmit={handleSearch}>
        <label for="default-search" class="text-gray-900 sr-only mb-2 text-sm font-medium dark:text-white">
          Search
        </label>
        <div class="relative w-full">
          <input
            type="search"
            id="default-search"
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
            class="block w-full rounded-2xl border border-transparent bg-gray-lightest p-4 pl-6 text-sm font-bold text-gray-darker placeholder-gray-light focus:border-purple-light focus:outline-none dark:bg-gray-darkest dark:text-white dark:caret-purple-light dark:focus:border-purple-light"
            placeholder="Search..."
            autocomplete="off"
          />
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
        </div>
      </form>
      <For each={searchResults()}>
        {(result) => (
          <Meaning
            word={result.word}
            meanings={result.meanings}
            phonetic={result.phonetic}
            phonetics={result.phonetics}
            sourceUrls={result.sourceUrls}
          />
        )}
      </For>
    </section>
  );
};

export default Search;
