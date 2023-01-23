import { Component, createSignal, For, Match, Show, Switch } from "solid-js";
import Meaning from "./Meaning";
import LoaderIcon from "../icons/Loader";
import SearchIcon from "../icons/SearchIcon";

const Search: Component = (props) => {
  const [searchResults, setSearchResults] = createSignal(null);
  const [status, setStatus] = createSignal("loading");
  const [search, setSearch] = createSignal("");

  const hashSearch = decodeURI(location.hash).replace("#", "");
  if (hashSearch) {
    setSearch(hashSearch);
    searchForWord(hashSearch);
  }

  window.addEventListener("hashchange", () => {
    const hashSearch = decodeURI(location.hash).replace("#", "");
    if (hashSearch) {
      setSearch(hashSearch);
      searchForWord(hashSearch);
    }
  });

  function handleSearch(event: Event) {
    event.preventDefault();
    location.href = `#${search()}`;
  }

  async function searchForWord(word: string) {
    setStatus("loading");
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
      setStatus("loaded");
    } else if (response.status === 404) {
      setStatus("not found");
    } else {
      setStatus("error");
    }
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
          <SearchIcon />
        </div>
      </form>

      <div class="mt-14">
        <Switch fallback={"Something went wrong 😕!"}>
          <Match when={status() === "loading"}>
            <div role="status">
              <LoaderIcon />
              <span class="sr-only">Loading...</span>
            </div>
          </Match>
          <Match when={status() === "loaded"}>
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
          </Match>
          <Match when={status() === "not found"}>
            <div class="mt-24 text-center">
              <div class="mb-8 text-6xl">😕</div>
              <div class="mb-4 font-bold">No Definitions Found</div>
              <div class="text-gray-light">
                Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again
                at later time or head to the web instead.
              </div>
            </div>
          </Match>
        </Switch>
      </div>
    </section>
  );
};

export default Search;
