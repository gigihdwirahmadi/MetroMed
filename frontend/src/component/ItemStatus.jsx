import axios from "axios";
import { useState, useEffect } from "react";
import { likeStatus } from "../service";

import './../assets/css/ItemStatus.css'

const ItemStatus = ({id,avatar, name, created_at, content, like_count, likes_count }) => {
const [isLike, setIsLike] = useState(like_count);
const [likeCount, setLikeCount] = useState(likes_count);
const likeHandle= async(e)=>{
  e.preventDefault();
  try{
  await likeStatus(id).then((response)=>{
    if(isLike==0){
      setIsLike(1);
      setLikeCount(likeCount+1)
    }else{
      setIsLike(0);
      setLikeCount(likeCount-1)
    }
  });

}catch(error){
  console.log(error);
}
}
  return (
    <div className="post">
          <div className="writer-div">
              <div className="avatar">
                  <img src={avatar}></img>
              </div>
              <div className="side">
                  <div className="writer-name">
                   {name}
                  </div>
                  <div className="time-div">
                    {created_at}
                  </div>
              </div>
              <div className="option">
              <span className={`like ${isLike==1 ? "red" : "black"}`} onClick={(e)=>likeHandle(e)}><i class="fa-solid fa-heart"></i> {likeCount}</span>
              </div>
          </div>
          <div className="content-div">
            {content}
          </div>
          
        </div>
  );
};
export default ItemStatus;
