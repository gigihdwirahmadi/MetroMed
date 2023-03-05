import axios from "axios";
import { useState, useEffect } from "react";


import './../assets/css/ItemStatus.css'
const ItemStatus = ({avatar, name, created_at, content }) => {

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
          </div>
          <div className="content-div">
            {content}
            {/* <div className="option-div">
            <div className="item-option">
            <i class="fa-regular fa-comment-dots"></i>
            </div>
            <div className="item-option">
            <i class="fa-regular fa-comment-dots"></i>
            </div>
          </div> */}
          </div>
          
        </div>
  );
};
export default ItemStatus;
