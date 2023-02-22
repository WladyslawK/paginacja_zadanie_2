import React, {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import s from './Pagination.module.css'

export const Pagination = () => {

  const [posts, setPosts] = useState<{ userId: number, id: number, title: string, body: string }[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)


  useEffect(() => {

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(error => {
        console.log(error)
      })


  }, [])


  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [postsPerPage])


  const totalPages = posts.length / postsPerPage
  //if(currentPage > totalPages) setCurrentPage(1)
  const pagination = new Array(totalPages).fill('').map((item, i) => i + 1)

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  let pg = []
  if (currentPage === 1) {
    pg = [1, 2, totalPages]
  } else if (currentPage === totalPages || currentPage === totalPages - 1) {
    pg = [1, currentPage - 1, currentPage]
  } else {
    pg = [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
  }

  pg = pg.map((item) => <li className={currentPage === item ? `${s.block} ${s.currentActivePage}` : s.block}
                            onClick={() => changePage(item)} key={item}>{item}</li>)

  const paginationList = pagination.map((item) => <li
    className={currentPage === item ? `${s.block} ${s.currentActivePage}` : s.block} onClick={() => changePage(item)}
    key={item}>{item}</li>)


  console.log('PAGINATION: ', pagination)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const items = posts.slice(firstPostIndex, lastPostIndex)

  const displayItems = items.map(item => <div className={s.postContainer} key={item.id}>
    <h2>{` ${item.id}. ${item.title}`}</h2></div>)

  //hook

  const pgItems = usePagination(posts.length, postsPerPage, 1, currentPage)

  console.log('USEPAGINATION: ', pgItems)
  return (
    <div>
      {
        displayItems
      }

      <div className={s.paginationContainer}>

        <ul className={s.paginationBody}>
          <li onClick={() => changePage(currentPage - 1)} className={s.block}>{`<`}</li>
          {
            //paginationList
            pg
          }
          <li onClick={() => changePage(currentPage + 1)} className={s.block}>{`>`}</li>
        </ul>

        <div className={s.paginationBody}>
          <label htmlFor="pet-select">posts per page:</label>

          <select
            name="posts"
            value={postsPerPage}
            onChange={(e) => setPostsPerPage(+e.currentTarget.value)}
            className={s.select}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

      </div>


      <div>
        <p>test pagination</p>
        <ul className={s.paginationBody}>
          <li onClick={() => changePage(currentPage - 1)} className={s.block}>{`<`}</li>
          {
            //paginationList
            pgItems && pgItems.map((item, i) => {
              if(item === DOTS) {
                return <li key={i}>...</li>
              }

              return <li key={i} className={currentPage === item ? `${s.block} ${s.currentActivePage}` : s.block} onClick={() => changePage(+item)}>{item}</li>


            })
          }
          <li onClick={() => changePage(currentPage + 1)} className={s.block}>{`>`}</li>
        </ul>
      </div>
    </div>
  );
}


type usePaginationType = {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}

const DOTS = 'DOTS'

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({length}, (_, idx) => idx + start);
};

const usePagination = (totalCount: number,
                       pageSize: number,
                       siblingCount: number,
                       currentPage: number) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};