import { type Component, createSignal, Show, createEffect } from "solid-js";
import BookIcon from "./../icons/Book";
import MoonIcon from "./../icons/Moon";
import DropDownIcon from "./../icons/Dropdown";
import clickOutside from "./../utils/click-outside";
const dontLetTypescriptStripThisAway = clickOutside;

const Header: Component = () => {
  const startedWithDarkMode = document.documentElement.classList.contains("dark");
  const startedWithFontStyle = localStorage.getItem("fontStyle") ?? "Sans Serif";
  const [fontStyle, setFontStyle] = createSignal(startedWithFontStyle);
  const [isShownFontStyle, showFontStyleDropdown] = createSignal(false);
  const [isDarkMode, setDarkMode] = createSignal(startedWithDarkMode);

  createEffect(() => {
    showFontStyleDropdown(false);
    document.documentElement.classList.remove("font-sans", "font-serif", "font-mono");
    document.documentElement.classList.add(
      {
        "Sans Serif": "font-sans",
        Serif: "font-serif",
        Mono: "font-mono",
      }[fontStyle()] ?? "font-sans"
    );
    localStorage.setItem("fontStyle", fontStyle());
  });

  function toggleTheme() {
    setDarkMode(!isDarkMode());

    if (isDarkMode()) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <header class="flex">
      <div class="invisible w-0 flex-1 cursor-pointer text-gray-light xs:visible" onClick={() => (location.href = "#")}>
        <BookIcon />
      </div>
      <div class="relative flex self-center font-bold">
        <button
          onClick={() => showFontStyleDropdown(!isShownFontStyle())}
          id="select-font-style"
          type="button"
          class="inline-flex w-32 items-center justify-end rounded-lg py-2.5 text-center text-sm font-bold text-gray-darker focus:outline-none dark:text-white"
        >
          {fontStyle()}
          <DropDownIcon />
        </button>

        <Show when={isShownFontStyle()}>
          <div class="absolute right-0 top-12 z-10 w-44 divide-y rounded-2xl bg-white text-lg text-gray-darker shadow-gray drop-shadow-gray dark:bg-gray-darkest dark:text-white dark:shadow-purple-light dark:drop-shadow-purple-light">
            <ul
              class="text-gray-700 dark:text-gray-200 cursor-pointer rounded-2xl py-3 text-sm"
              aria-labelledby="select-font-style"
              use:clickOutside={() => showFontStyleDropdown(false)}
            >
              <li
                onClick={() => setFontStyle("Sans Serif") && showFontStyleDropdown(false)}
                class="px-6 py-2 font-sans hover:text-purple-light"
              >
                Sans Serif
              </li>
              <li
                onClick={() => setFontStyle("Serif") && showFontStyleDropdown(false)}
                class="px-6 py-2 font-serif hover:text-purple-light"
              >
                Serif
              </li>
              <li
                onClick={() => setFontStyle("Mono") && showFontStyleDropdown(false)}
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
          <span class="sr-only">Darkmode Toggle</span>
          <input type="checkbox" checked={startedWithDarkMode} class="peer sr-only" />
          <div
            onClick={toggleTheme}
            class="peer my-auto h-6 w-10 rounded-full bg-gray-light after:absolute after:top-1 after:left-[4px] after:h-4 after:w-4 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-light peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-light dark:bg-gray-darkest"
          ></div>
        </label>
      </div>
      <div class="ml-4 flex self-center text-purple-light">
        <MoonIcon />
      </div>
    </header>
  );
};

export default Header;
