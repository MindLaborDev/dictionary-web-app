import type { Component } from "solid-js";

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
  return <section class="flex">{props.word}</section>;
};

export default Meaning;
