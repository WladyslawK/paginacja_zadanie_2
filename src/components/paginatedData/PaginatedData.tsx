import React from 'react';
import {postTpe} from "../../sample/Sample";

type PaginatedDataType = {
  posts: postTpe[]
}
const PaginatedData: React.FC<PaginatedDataType> = ({posts}) => {

  const displayItems = posts.map(item => <div style={{display: 'flex', justifyContent: 'flex-start', marginLeft: '30px'}} key={item.id}>
    <h2>{` ${item.id}. ${item.title}`}</h2></div>)


  return (
    <div>
      {
        displayItems
      }
    </div>
  );
};

export default PaginatedData;