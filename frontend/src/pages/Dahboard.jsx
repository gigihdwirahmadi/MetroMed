import React from "react";
import "./../assets/css/dashboard.css"
import "../component/ItemStatus"
import avatar from "./../assets/img/bg2.png"
import {NavLink} from "react-router-dom"
import ItemStatus from "../component/ItemStatus";
import axios from "axios";
import { useEffect, useRef, useState, useReducer } from "react";
import { getStatus } from "../service";

const Dashboard = () => {
  const [update, setUpdate] = useState( useReducer((x) => x + 1, 0));
  const [status, setStatus] = useState([]); 
  const catchStatus = async () => {
    try {
      console.log( axios.defaults.headers.common)
      await getStatus().then((response) => {   
        console.log(response.data)
        setStatus(response.data);
     
        setUpdate();
    });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  catchStatus();
  }, [update]);
  return (
    <>
    <div className="mother-wall">
      <div className="wall1">
        <div className="title">
          All Post
        </div>
        {
          status? status.map((value, index) => {
        return (
        <>
            <NavLink
            to={`/status/${value.id}`}
            className="NavLink"
          >
          <ItemStatus key={value} avatar={avatar} name={value.users.name} created_at={value.created_at} content={value.detail}/>
          </NavLink>
        </>
        )
       
      })
      : <><div>no data</div></>
    }
      </div>
    </div>
   
    </>
  )
};
export default Dashboard;
