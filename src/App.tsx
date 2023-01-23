import type { Component } from "solid-js";
import Header from "./components/Header";
import Search from "./components/Search";

const App: Component = () => {
  return (
    <div class="pt-4">
      <div class="container mt-14 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg">
        <Header />
        <Search />
      </div>
    </div>
  );
};

export default App;
