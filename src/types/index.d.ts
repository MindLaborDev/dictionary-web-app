
export interface MeaningType {
  partOfSpeech: string;
  definitions: {
    definition: string;
  }[];
  antonyms: string[];
  synonyms: string[];
}

export interface WordType {
  word: string;
  meanings: MeaningType[];
  phonetic: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  sourceUrls: string[];
}
