import React, {useState} from 'react';
import s from './Pagination.module.css'

type paginationStateType = {
  actualPageIdx: number,
  lastPageIdx: number,
  entriesOnSelectedPage: number,
  isBusy: boolean
}

type PaginationType = {
  paginationState: paginationStateType,
  paginationActions: {}
}


export const Pagination: React.FC<PaginationType> = ({paginationState}) => {


  const pages = []
  for(let i = paginationState.actualPageIdx ; i<=paginationState.actualPageIdx + 5; i++){
    if(i !== 1 && i !== paginationState.lastPageIdx){
      pages.push(i)
    }

  }

  const paginationItems: Array<JSX.Element> = pages.map(item => <div className={paginationState.actualPageIdx === item ? `${s.active} ${s.paginationItem}`: s.paginationItem} key={item}>{item}</div>)


  const [currentPage, setCurrentPage] = useState(1)


  //const paginationItems: Array<JSX.Element> = []
  /*for(let i = 1; i < a; i++){
    paginationItems.push(<div className={s.paginationItem} key={i}>{i}</div>)
  }*/



  return (
    <div className={s.mainContainer}>
      <div className={s.paginationItem}>{'<'}</div>

      <div className={s.paginationItem}>1</div>

      <div className={s.devider}>...</div>

      {paginationItems}

      <div className={s.devider}>...</div>

      <div className={s.paginationItem}>10</div>

      <div className={s.paginationItem}>{'>'}</div>
    </div>
  );
}