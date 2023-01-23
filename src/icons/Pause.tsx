import type { Component } from "solid-js";

const PauseIcon: Component = () => {
  return (
    <svg
      width="75"
      height="75"
      class="cursor-pointer self-center"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="37.5" cy="37.5" r="37.5" class="fill-purple-light opacity-25 group-hover:opacity-100" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27 27V48H34V27H27Z"
        class="fill-purple-light group-hover:fill-white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M41 27V48H48V27H41Z"
        class="fill-purple-light group-hover:fill-white"
      />
    </svg>
  );
};

export default PauseIcon;
