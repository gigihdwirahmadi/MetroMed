import axios from "axios";
import { useState, useEffect } from "react";
import { deleteComment } from "../service";
import { likeComment } from "../service";
import './../assets/css/ReplyComment.css'
const ReplyComment = ({ name, likes, created_at, content, like, id_user, id, setrender}) => {
const user = JSON.parse(localStorage.getItem("user"));
const [isLike, setIsLike] = useState(like);
const [likeCount, setLikeCount] = useState(likes);
  const likeHandle= async(e)=>{
    e.preventDefault();
    console.log(id)
    try{
    await likeComment(id).then((response)=>{
   
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
  const removeComment = async () => {
    console.log(id, id_user)
    try {
      await deleteComment(id).then((response) => {
        setrender(id);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateComment = async () => {
    // handleUpdate(id);
  };
  const addReply =() => {
    // createReply(id)
  };
  const showreply = async () => {
    
  };
  return (
    <div className="wall-reply">
      <div className="post-comment">
        <div className="user-div">

          <div className="side">
            <div className="writer-name">
            {user?.id == id_user && <span>You</span>}
            {user?.id != id_user && <span>{name}</span>}
            </div>
            <div className="time-div">
              {created_at}
              <div className="menu-nav">
                <div className="menu-item"></div>
                <div className="dropdown-container" tabindex="-1">
                  <div className="three-dots"></div>
                  <div className="dropdown">
                  {user?.id == id_user &&
                    <div className="button" onClick={removeComment}><div>delete</div></div>
                  }
                  {user?.id == id_user &&
                    <div className="button" onClick={UpdateComment}><div>edit</div></div> 
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-div">
          <div>
            {content}
          </div>
        </div>
        <div className="option">
              <span className={`like ${isLike==1 ? "red" : "black"}`} onClick={(e)=>likeHandle(e)}><i className="fa-solid fa-heart"></i> {likeCount}</span>
              </div>
      </div>

    </div>
  );
};
export default ReplyComment;