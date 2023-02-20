import React, {useEffect, useState} from 'react';
import axios from "axios";

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
  const [postsPerPage, setPostsPerPage] = useState(10)

  const totalPages = posts.length / postsPerPage


  const items = posts.filter((item, i) => i < postsPerPage)


  const displayItems = items.map(item => <div key={item.id}><h2>{` ${item.id}. ${item.title}`}</h2></div>)


  console.log('ITEMS: ', displayItems)


  return (
    <div>
      {
        displayItems
      }

      <div>
        <div>

        </div>
      </div>
    </div>
  );
}