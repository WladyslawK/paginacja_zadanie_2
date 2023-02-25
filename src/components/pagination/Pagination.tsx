import React from 'react'
import s from './Pagination.module.css'
import {DOTS} from "../../hooks/usePaginationLayout"
import {paginationActionsType, paginationStateType} from "../../hooks/usePagination";


type PaginationType = {
  pagination: Array<number | string>
  paginationState: paginationStateType
  paginationActions: paginationActionsType
}

export const Pagination: React.FC<PaginationType> = ({pagination, paginationActions, paginationState}) => {

  const {actualPageIdx, lastPageIdx, entriesOnSelectedPage} = paginationState
  const {goToFirstPage, goToPrevPage, goToPage, goToNextPage, goToLastPage, changeEntriesOnPage} = paginationActions

  console.log('USEPAGINATION: ', pagination)
  return (
    <div>

      <div className={s.paginationContainer}>

        <ul className={s.paginationBody}>
          <li onClick={goToPrevPage} className={actualPageIdx === 1 ? `${s.block} ${s.disabled}` : s.block}>{`<`}</li>
          {
            //paginationList
            pagination.map((item, i) => {
              if(item === DOTS) {
                return <li key={i}>...</li>
              }

              return <li key={i} className={actualPageIdx === item ? `${s.block} ${s.currentActivePage}` : s.block} onClick={() => goToPage(+item)}>{item}</li>

            })
          }
          <li onClick={goToNextPage} className={actualPageIdx === pagination[pagination.length-1] ? `${s.block} ${s.disabled}` : s.block}>{`>`}</li>
        </ul>

        <div className={s.paginationBody}>
          <label htmlFor="pet-select">posts per page:</label>

          <select
            name="posts"
            value={entriesOnSelectedPage}
            onChange={(e) => changeEntriesOnPage(+e.currentTarget.value)}
            className={s.select}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

      </div>
    </div>
  );
}



