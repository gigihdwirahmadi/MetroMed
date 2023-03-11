import axios from "axios";
import { useState, useEffect } from "react";
import moment from 'moment'
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { deleteStatus } from "../service";
import { Modal, Button } from 'react-bootstrap'
import './../assets/css/CrudStatusComponent.css'
const CrudStatusComponent = ({ fungsi,avatar, name, created_at, content ,id,render}) => {
    const [isShow, invokeModal] = useState(false)
const initModal = () => {
    if (isShow == false) {
        return invokeModal(true)
    }
    else {
        return invokeModal(false)
    }
}
const updateHandle = (e) => {
    e.preventDefault();
  fungsi(id);
}
const deleteHandle= async (e) => {
    e.preventDefault();
    await deleteStatus(id).then((response) => {
        render(id);
        toast.success('Delete Status Success !', {
            position: toast.POSITION.TOP_RIGHT
        });
    });
    }

  return (
    <div className="post">
          <div className="writer-div">
         
              <div className="avatar">
                  <img src={avatar}></img>
              </div>
              <NavLink
            to={`/status/${id}`}
            className="NavLink"
          >
              <div className="side">
                  <div className="writer-name">
                   {name}
                  </div>
                  <div className="time-div">
                    {moment.utc(created_at).fromNow()}
                  </div>
              </div>
              </NavLink>
              <div className="option">
              <span ><i className="fa-solid fa-pen-to-square" onClick={(e)=>updateHandle(e)}></i></span>
              <span><i className="fa-solid fa-trash" onClick={(e)=>deleteHandle(e)}></i></span>
              </div>
          </div>
          <div className="content-div">
            {content}

          </div>
          
        </div>
  );
};
export default CrudStatusComponent;
