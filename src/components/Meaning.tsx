import { Component, For, Show } from "solid-js";
import PlayIcon from "../icons/Play";

interface MeaningType {
  partOfSpeech: string;
  definitions: {
    definition: string;
  }[];
  antonyms: string[];
  synonyms: string[];
}

const Meaning: Component<{
  word: string;
  meanings: MeaningType[];
  phonetic: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  sourceUrls: string[];
}> = (props) => {
  return (
    <section class="mb-10">
      <div class="flex">
        <div class="flex-1">
          <h2 class="text-gray-900 text-6xl font-bold dark:text-white">{props.word}</h2>
          <p class="mt-2 text-2xl text-purple-light">{props.phonetic}</p>
        </div>
        <div class="flex w-[75px]">
          <PlayIcon />
        </div>
      </div>
      <For each={props.meanings}>
        {(meaning) => (
          <div class="mt-10">
            <div class="flex">
              <h3 class="relative text-2xl font-bold italic text-gray-darker dark:text-white">
                {meaning.partOfSpeech}
              </h3>
              <hr class="ml-5 w-full flex-1 self-center text-gray-dark" />
            </div>
            <p class="mt-8 text-xl text-gray-light">Meaning</p>
            <ul class="mt-4 list-disc text-lg text-purple">
              <For each={meaning.definitions}>
                {(definition) => (
                  <li class="ml-10 mb-2">
                    <p class="ml-5 text-gray-darker dark:text-white">{definition.definition}</p>
                  </li>
                )}
              </For>
            </ul>
            <Show when={meaning.synonyms.length > 0}>
              <p class="mt-0 list-disc text-lg text-purple">
                <span class="mt-8 inline-block w-24 text-xl text-gray-light">Synonyms</span>
                <span class="font-bold text-purple-light">
                  <For each={meaning.synonyms}>
                    {(synonym) => (
                      <span class="ml-5 visited:text-purple-light active:text-purple-light ">{synonym}</span>
                    )}
                  </For>
                </span>
              </p>
            </Show>
            <Show when={meaning.antonyms.length > 0}>
              <p class="mt-10 list-disc text-lg text-purple">
                <span class="inline-block w-24 text-xl text-gray-light">Antonyms</span>
                <span class="font-bold text-purple-light">
                  <For each={meaning.antonyms}>
                    {(antonym) => (
                      <span class="ml-5 visited:text-purple-light active:text-purple-light ">{antonym}</span>
                    )}
                  </For>
                </span>
              </p>
            </Show>
          </div>
        )}
      </For>
    </section>
  );
};

export default Meaning;
