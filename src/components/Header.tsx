import {
  type Component,
  createSignal,
  onMount,
  Show,
  createEffect,
} from "solid-js";
import BookIcon from "./../icons/Book";
import MoonIcon from "./../icons/Moon";

const Header: Component = () => {
  const [fontStyle, setFontStyle] = createSignal("Sans Serif");
  const [isShownFontStyle, showFontStyle] = createSignal(false);

  createEffect(() => {
    showFontStyle(false);
    document.documentElement.classList.remove(
      "font-sans",
      "font-serif",
      "font-mono"
    );
    document.documentElement.classList.add(
      {
        "Sans Serif": "font-sans",
        Serif: "font-serif",
        Mono: "font-mono",
      }[fontStyle()] ?? "font-sans"
    );
  });

  return (
    <header class="flex">
      <div class="flex-1 text-gray-light">
        <BookIcon />
      </div>
      <div class="relative flex self-center font-bold">
        <button
          onClick={() => showFontStyle(!isShownFontStyle())}
          id="select-font-style"
          type="button"
          class="inline-flex w-32 items-center justify-end rounded-lg py-2.5 pl-4 text-center text-sm font-bold text-white focus:outline-none"
        >
          {fontStyle()}
          <svg
            class="ml-4 h-4 w-4 text-purple-light"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <Show when={isShownFontStyle()}>
          <div
            id="select-font-style-dropdown"
            class="absolute right-0 top-12 z-10 w-44 divide-y rounded-2xl bg-white text-lg text-gray-darker shadow-purple-light drop-shadow-purple-light dark:bg-gray-darkest dark:text-white"
          >
            <ul
              class="text-gray-700 dark:text-gray-200 cursor-pointer rounded-2xl py-3 text-sm shadow-purple-light"
              aria-labelledby="select-font-style"
            >
              <li
                onClick={() => setFontStyle("Sans Serif")}
                class="px-6 py-2 font-sans hover:text-purple-light"
              >
                Sans Serif
              </li>
              <li
                onClick={() => setFontStyle("Serif")}
                class="px-6 py-2 font-serif hover:text-purple-light"
              >
                Serif
              </li>
              <li
                onClick={() => setFontStyle("Mono")}
                class="px-6 py-2 font-mono hover:text-purple-light"
              >
                Mono
              </li>
            </ul>
          </div>
        </Show>
      </div>
      <div class="ml-6 border-r-2 border-gray-lighter dark:border-white"></div>
      <div class="ml-6 flex self-center">
        <label class="relative inline-flex cursor-pointer items-center self-center">
          <input type="checkbox" value="" class="peer sr-only" />
          <div class="peer my-auto h-6 w-10 rounded-full bg-gray-darkest after:absolute after:top-1 after:left-[4px] after:h-4 after:w-4 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-light peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-gray-half-darkest peer-checked:peer-focus:ring-purple-lighter dark:border-gray-light dark:bg-gray-darkest"></div>
        </label>
      </div>
      <div class="ml-4 flex self-center text-purple-light">
        <MoonIcon />
      </div>
    </header>
  );
};

export default Header;
