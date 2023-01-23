import { Component } from "solid-js";
import PlayIcon from "../icons/Play";

const Player: Component<{
  soundLink: string;
}> = (props) => {
  function playSound() {
    console.log(props.soundLink);
    const audio = new Audio(props.soundLink);
    audio.play();
  }

  return (
    <button onClick={() => playSound()} class="group transition-all">
      <PlayIcon />
    </button>
  );
};

export default Player;
