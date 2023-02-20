import React from 'react';
import './App.css';
import {PaginatedTable} from "./components/paginatedTable/PaginatedTable";
import {Pagination} from "./sample/Pagination";

function App() {
  return (
    <div className="App">
        Paginacja
      <PaginatedTable dataEntries={{}}/>
      <Pagination/>
    </div>
  );
}

export default App;
