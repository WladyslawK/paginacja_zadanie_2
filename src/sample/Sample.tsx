import React, {useEffect, useState} from 'react'
import axios from "axios"
import {usePagination} from "../hooks/usePagination"
import PaginatedData from "../components/paginatedData/PaginatedData"
import {Pagination} from "../components/pagination/Pagination"
import {usePaginationLayout} from "../hooks/usePaginationLayout";

export type postTpe = {
  userId: number
  id: number
  title: string
  body: string
}

export const Sample = () => {

  const [posts, setPosts] = useState<postTpe[]>([])
  const [paginationState, paginationActions] = usePagination(posts)

  const {actualPageIdx, entriesOnSelectedPage} = paginationState
  const {goToFirstPage} = paginationActions

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
      goToFirstPage()
  }, [entriesOnSelectedPage])

  const lastPostIndex = actualPageIdx * entriesOnSelectedPage
  const firstPostIndex = lastPostIndex - entriesOnSelectedPage
  const items = posts.slice(firstPostIndex, lastPostIndex)

  const pagination = usePaginationLayout(posts.length, entriesOnSelectedPage, 1, actualPageIdx)


  return (
    <div>
      <PaginatedData posts={items}/>
      <Pagination
        pagination={pagination}
        paginationState={paginationState} paginationActions={paginationActions}
      />
    </div>
  );
}