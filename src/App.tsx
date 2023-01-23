import type { Component } from "solid-js";
import Header from "./components/Header";
import Search from "./components/Search";

const App: Component = () => {
  return (
    <div class="px-14 pt-4">
      <div class=" container mt-14">
        <Header />
        <Search />
      </div>
    </div>
  );
};

export default App;
