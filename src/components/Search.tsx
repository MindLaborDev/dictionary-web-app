import { Component, createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import Meaning from "./Meaning";
import LoaderIcon from "../icons/Loader";
import SearchIcon from "../icons/SearchIcon";
import type { WordType } from "../types";

const Search: Component = () => {
  const [searchResults, setSearchResults] = createSignal<WordType[] | null>(null);
  const [status, setStatus] = createSignal("idle");
  const [search, setSearch] = createSignal("");
  const [searchInvalid, setSearchInvalid] = createSignal(false);
  let submitted = false;

  createEffect(() => {
    setSearchInvalid(!search() && submitted);
  });

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
    } else {
      submitted = false;
      setStatus("idle");
      setSearch("");
    }
  });

  function handleSearch(event: Event) {
    event.preventDefault();
    submitted = true;

    const searchValue = search();
    if (searchValue) {
      location.hash = encodeURI(searchValue);
      searchForWord(searchValue);
    } else {
      setSearchInvalid(true);
    }
  }

  async function searchForWord(word: string) {
    setStatus("loading");

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
      const data = await response.json();

      // Choose a phonetic with audio
      for (const word of data) {
        word.phonetics = word.phonetics.filter((phonetic: any) => phonetic.audio);
        word.phonetic = word.phonetics[0]?.text ?? word.phonetic ?? "";
      }

      submitted = false;
      setSearchResults(data);
      setStatus("loaded");
      return;
    }

    submitted = false;
    setStatus(response.status === 404 ? "not found" : "error");
  }

  return (
    <main class="mt-14 w-full">
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
            class="block w-full rounded-2xl border border-transparent bg-gray-lightest p-5 pl-6 text-sm font-bold text-gray-darker placeholder-gray-light invalid:!border-red focus:border-purple-light focus:outline-none dark:bg-gray-darkest dark:text-white dark:caret-purple-light dark:focus:border-purple-light"
            placeholder="Search for any word..."
            autocomplete="off"
            required={searchInvalid()}
          />
          <SearchIcon />
        </div>
        <Show when={searchInvalid()}>
          <p class="mt-2 text-base text-red">Whoops, can't be empty…</p>
        </Show>
      </form>

      <div>
        <Switch fallback={"Something went wrong 😕!"}>
          <Match when={status() === "loading"}>
            <div role="status" class="mt-14">
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
              <div class="mb-8 text-8xl">😕</div>
              <h1 class="mb-4 text-2xl font-bold">No Definitions Found</h1>
              <p class="text-gray-light">
                Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again
                at later time or head to the web instead.
              </p>
            </div>
          </Match>
          <Match when={status() === "idle"}>
            <div class="mt-24 text-center">
              <div class="mb-8 text-8xl">💂‍♂️</div>
              <h1 class="mb-4 text-2xl font-bold">Search for a word</h1>
              <p class="text-gray-light">
                Enter a word in the search box above to get its definition, synonyms and more.
              </p>
            </div>
          </Match>
        </Switch>
      </div>
    </main>
  );
};

export default Search;
