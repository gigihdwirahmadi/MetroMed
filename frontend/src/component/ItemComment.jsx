import axios from "axios";
import moment from 'moment'
import { useState, useEffect } from "react";
import { deleteComment, replyComment } from "../service";
import LoadingComponent from "../component/LoadingComponent";
import { likeComment } from "../service";
import ReplyComment from "./ReplyComment";
import './../assets/css/ItemComment.css'
const ItemComment = ({ name, likes, created_at, content, like, id_user, id, setrender,renderReplyDelete, renderReply, handleUpdate, replytotal, createReply, setid }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLike, setIsLike] = useState(like);
  const [isLoad, setIsLoading]= useState(false)
  const [totalReply, setTotalReply] = useState(replytotal)
  const [isShow, setIsShow] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [reply, setReply] = useState([]);
  const [isReply, setIsReply] = useState(false);
  const likeHandle = async (e) => {
    e.preventDefault();
    try {
      await likeComment(id).then((response) => {
        if (isLike == 0) {
          setIsLike(1);
          setLikeCount(likeCount + 1)
        } else {
          setIsLike(0);
          setLikeCount(likeCount - 1)
        }
      });

    } catch (error) {
      console.log(error);
    }
  }
  const removeComment = async () => {
    console.log(id, id_user)
    try {
      await deleteComment(id).then((response) => {
        setrender(id);
        setIsShow(false)
      });
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateComment = async () => {
    handleUpdate(id);
  };
  const addReply = async (e) => {
    e.preventDefault();
    await createReply(id)
  };
  const showreply = async (e) => {
    e.preventDefault();
    if (isShow == false) {
      setIsShow(true);
      catchreply();
    } else {
      setIsShow(false)

    }
  };
  const catchreply = async (e) => {
    setReply([])
    setIsLoading(true)
    await replyComment(id).then((response) => {
      setIsLoading(false)
      setReply([...response.data.data])
    });
  }
  const renderDeleteReply=()=>{
    catchreply();
    renderReplyDelete(id);
    
  }
  useEffect(() => {
    catchreply(); setReply([]);setIsShow(false);console.log("render reply")
  }, [renderReply]);
  
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
            {moment.utc(created_at).fromNow()  }
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
                    <div className="button" onClick={(e) => addReply(e)}><div>Reply</div></div>
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
       
          <div className="btn-reply">
          {replytotal>0 &&
            <button className="btn btn-light" onClick={(e) => showreply(e)}>{isShow?"Close Reply" : "Show Reply"}</button>}</div>

          <span className={`like ${isLike == 1 ? "red" : "black"}`} onClick={(e) => likeHandle(e)}><i className="fa-solid fa-heart"></i> {likeCount}</span>
        </div>

      </div>
      {isShow == true &&
        reply.map((value, index) => {
          return (
            <div key={index}>
              <ReplyComment
                id={value.comment_id}
                key={value}
                name={value.users.name}
                id_user={value.users.id}
                created_at={value.created_at}
                like={value.like_comment_count}
                likes={value.likes_comment_count}
                setrender={renderDeleteReply}
                update={handleUpdate}
                content={value.comment} />

            </div>

          )

        })
      }
      { isLoad==true && isShow==true&&<span><LoadingComponent/></span>}
    </>
  );
};
export default ItemComment;
