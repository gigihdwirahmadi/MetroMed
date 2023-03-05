import axios from "axios";
import { useState, useEffect } from "react";
import { deleteComment } from "../service";

import './../assets/css/ItemComment.css'
const ItemComment = ({name, created_at, content ,id_user,id, setrender}) => {
const user= JSON.parse(localStorage.getItem("user"));
const removeComment = async () => {
console.log(id,id_user)
  try {
      await deleteComment(id).then((response) => {
        
          setrender();
      });
  } catch (error) {
      console.log(error);
  }
};
  return (
    <div className="post">
          <div className="user-div">
              
              <div className="side">
                  <div className="writer-name">
                   {name}
                  </div>
                  <div className="time-div">
                    {created_at}
                  </div>
              </div>
          </div>
          <div className="content-div">
    <div>
            {content}
            </div>
            {user?.id == id_user && 
  
          <div className="option">
            <div className="item-option" onClick={removeComment}><i class="fa-solid fa-trash"></i></div>
          </div>
          }
          </div>
          
        </div>
  );
};
export default ItemComment;
