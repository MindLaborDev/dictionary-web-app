import { Component, createSignal, Show } from "solid-js";
import PauseIcon from "../icons/Pause";
import PlayIcon from "../icons/Play";

const Player: Component<{
  soundLink: string;
}> = (props) => {
  const [isPlaying, setIsPlaying] = createSignal(false);
  const audio = new Audio(props.soundLink);

  function playPauseSound() {
    if (isPlaying()) {
      setIsPlaying(false);
      audio.pause();
      return;
    }

    setIsPlaying(true);
    audio.play();
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });
  }

  return (
    <button onClick={() => playPauseSound()} class="group transition-all">
      <Show when={!isPlaying()}>
        <PlayIcon />
      </Show>
      <Show when={isPlaying()}>
        <PauseIcon />
      </Show>
    </button>
  );
};

export default Player;
