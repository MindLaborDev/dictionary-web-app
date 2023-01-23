import { Component, createEffect, createSignal, For, Show } from "solid-js";
import ExternalLinkIcon from "../icons/ExternalLink";
import Player from "./Player";

const Meaning: Component<WordType> = (props) => {
  const [audioURL, setAudioURL] = createSignal("");

  createEffect(() => {
    const urls = props.phonetics.map((phonetic) => phonetic.audio).filter(Boolean);
    if (urls.length > 0) {
      setAudioURL(urls[0]);
    } else {
      setAudioURL("");
    }
  });

  return (
    <section class="mt-20">
      <div class="flex">
        <div class="flex-1">
          <h2 class="text-gray-900 text-6xl font-bold dark:text-white">{props.word}</h2>
          <p class="mt-2 text-2xl text-purple-light">{props.phonetic}</p>
        </div>
        <div class="flex w-[75px]">
          <Show when={audioURL()}>
            <Player soundLink={audioURL()} />
          </Show>
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
            <p class="mt-10 text-xl text-gray-light">Meaning</p>
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
              <p class="mt-10 list-disc text-xl text-purple">
                <span class="w-24 text-gray-light">Synonyms</span>
                <For each={meaning.synonyms}>
                  {(synonym) => (
                    <span class=" ml-5 inline-block text-xl font-bold  text-purple-light visited:text-purple-light active:text-purple-light ">
                      {synonym}
                    </span>
                  )}
                </For>
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
      <Show when={props.sourceUrls.length > 0}>
        <hr class="mt-12 w-full text-gray-dark" />
        <p class="mt-4 text-sm text-gray-light">
          Source
          <a
            href={props.sourceUrls[0]}
            class="ml-4 text-gray-darker hover:underline dark:text-white"
            target="_blank"
            rel="noreferrer"
          >
            {props.sourceUrls[0]} <ExternalLinkIcon />
          </a>
        </p>
      </Show>
    </section>
  );
};

export default Meaning;
