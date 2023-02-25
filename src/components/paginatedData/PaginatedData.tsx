import React from 'react';
import {postTpe} from "../../sample/Sample";
import s from "*.module.css";

type PaginatedDataType = {
  posts: postTpe[]
}
const PaginatedData: React.FC<PaginatedDataType> = ({posts}) => {

  const displayItems = posts.map(item => <div className={s.postContainer} key={item.id}>
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