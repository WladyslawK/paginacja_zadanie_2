import React from 'react';
import {Pagination} from "../pagination/Pagination";

type PaginatedTableType = {
  dataEntries: {}
}

export const PaginatedTable: React.FC<PaginatedTableType> = ({dataEntries}) => {
  return (
    <div>

      <Pagination paginationActions={{}} paginationState={paginationState}/>
    </div>
  );
}


const paginationState = {
  actualPageIdx: 5,
  lastPageIdx: 20,
  entriesOnSelectedPage: 30,
  isBusy: false
}