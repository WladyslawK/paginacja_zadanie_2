import React, {useEffect, useState} from 'react';
import axios from "axios";
import s from './Pagination.module.css'

export const Pagination = () => {


  useEffect(() => {

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
      setPosts(res.data)
    })
      .catch(error => {
      console.log(error)
      })

  }, [])

  const [posts, setPosts] = useState<{userId: number, id: number, title: string, body: string}[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  const totalPages = posts.length / postsPerPage
  const pagination = new Array(totalPages).fill('').map((item, i) => i + 1)

  const paginationList = pagination.map((item) => <li className={s.block} key={item}>{item}</li>)

  console.log('PAGINATION: ', pagination)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const items = posts.slice(firstPostIndex, lastPostIndex)

  const displayItems = items.map(item => <div key={item.id}><h2>{` ${item.id}. ${item.title}`}</h2></div>)





  return (
    <div>
      {
        displayItems
      }

      <div className={s.paginationContainer}>

        <ul className={s.paginationBody}>
          <li className={s.block}>{`<`}</li>
          {paginationList}
          <li className={s.block}>{`>`}</li>
        </ul>

        <div className={s.paginationBody}>
          <label htmlFor="pet-select">posts per page:</label>

          <select
            name="posts"
            value={postsPerPage}
            onChange={(e) => setPostsPerPage(+e.currentTarget.value)}
            className={s.select}
          >
            <option value={10} >10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

      </div>
    </div>
  );
}