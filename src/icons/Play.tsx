import type { Component } from "solid-js";

const PlayIcon: Component = () => {
  return (
    <svg
      width="75"
      height="75"
      class="cursor-pointer self-center"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.25"
        cx="37.5"
        cy="37.5"
        r="37.5"
        class="fill-purple-light opacity-25 group-hover:opacity-100"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29 27V48L50 37.5L29 27Z"
        class="fill-purple-light group-hover:fill-white"
      />
    </svg>
  );
};

export default PlayIcon;
