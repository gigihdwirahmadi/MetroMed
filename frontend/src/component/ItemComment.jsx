import axios from "axios";
import { useState, useEffect } from "react";
import { deleteComment } from "../service";
import { likeComment } from "../service";
import './../assets/css/ItemComment.css'
const ItemComment = ({ name, likes, created_at, content, like, id_user, id, setrender, handleUpdate, replytotal,createReply,setid }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLike, setIsLike] = useState(like);
const [likeCount, setLikeCount] = useState(likes);
  const [isReply, setIsReply] = useState(false);
  const likeHandle= async(e)=>{
    e.preventDefault();
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
    handleUpdate(id);
  };
  const addReply =() => {
    createReply(id)
  };
  const showreply = async () => {
    
  };
  return (
    <>
      <div className="post">
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
                    <div className="button" onClick={addReply}><div>Reply</div></div>
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
              <span className={`like ${isLike==1 ? "red" : "black"}`} onClick={(e)=>likeHandle(e)}><i class="fa-solid fa-heart"></i> {likeCount}</span>
              </div>
        {/* {replytotal > 0 && isReply == false &&
          <button onClick={(e) => showreply(e)}>reply</button>} */}
      </div>

    </>
  );
};
export default ItemComment;
