import type { Component } from "solid-js";
import Header from "./components/Header";
import Search from "./components/Search";

const App: Component = () => {
  return (
    <div class="h-screen w-screen bg-white p-3 pt-4 text-gray-darker dark:bg-gray-night dark:text-white">
      <div class="container mt-14 md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg">
        <Header />
        <Search />
      </div>
    </div>
  );
};

export default App;
