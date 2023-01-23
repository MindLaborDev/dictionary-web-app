import { onCleanup } from "solid-js";

export default function clickOutside(el: HTMLElement, accessor: () => () => boolean) {
  const onClick = (e: Event) => !el.contains(e.target as Node) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
