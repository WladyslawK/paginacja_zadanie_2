import {useState} from "react";
import {postTpe} from "./Pagination";

type paginationStateType = {
  actualPageIdx: number
  lastPageIdx: number
  entriesOnSelectedPage: number
}

type paginationActionsType = {
  goToFirstPage: () => void
  goToPrevPage: () => void
  goToPage: (pageIdx: number) => void
  goToNextPage: () => void
  goToLastPage: () => void
  changeEntriesOnPage: (entries: number) => void
}

export const usePagination = (dataEntries: postTpe[], elementsOnPage: number = 10): [paginationState: paginationStateType, paginationActions: paginationActionsType] => {

  const [actualPageIdx, setActualPageIdx] = useState(1)
  const [entriesOnSelectedPage, setEntriesOnSelectedPage] = useState(10)

  const lastPageIdx = Math.ceil(dataEntries.length / elementsOnPage)


  //go to firstPage callback
  const goToFirstPage = () => setActualPageIdx(1)

  //go to Page
  const goToPage = (pageIdx: number) => setActualPageIdx(pageIdx)

  //go to next Page
  const goToNextPage = () => setActualPageIdx(prevState => prevState + 1)

  //go to previous page
  const goToPrevPage = () => setActualPageIdx(prevState => prevState - 1)

  // go to last page
  const goToLastPage = () => setActualPageIdx(lastPageIdx)

  //change Entries on page
  const changeEntriesOnPage = (entries: number) => setEntriesOnSelectedPage(entries)

  const paginationState: paginationStateType = {
    actualPageIdx,
    lastPageIdx,
    entriesOnSelectedPage
  }
  const paginationActions: paginationActionsType = {goToFirstPage, goToPrevPage, goToPage, goToNextPage, goToLastPage, changeEntriesOnPage}


  return [paginationState, paginationActions]

  // return [paginationState, paginationActions]
}