import React from "react";
import "./../assets/css/dashboard.css"
import "../component/ItemStatus"
import avatar from "./../assets/img/bg2.png"
import {NavLink} from "react-router-dom"
import ItemStatus from "../component/ItemStatus";
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from "axios";
import LoadingComponent from "../component/LoadingComponent";
import { useEffect, useRef, useState, useReducer } from "react";
import { getStatus } from "../service";
import NotFoundComponent from "../component/NotFoundComponent";
const Dashboard = () => {
  const data={
          items: [],
          hasMore: true
      }
  const [update, setUpdate] = useState( useReducer((x) => x + 1, 0));
  const [status, setStatus] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [param, setParam]= useState('');
  const catchStatus = async () => {
    try {
      setIsLoading(true);
      await getStatus({params:{search:param}}).then((response) => {   
        setStatus(response.data);
        setIsLoading(false);
        setUpdate()
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
    {isLoading ? <LoadingComponent /> :
      <div className="wall1">
        <div className="title">
          <div class="text"></div>
          
        </div>
        <div class="d-flex">
        <input class="form-control me-2" value={param} placeholder="Search" onChange={(e) => setParam(e.target.value)} aria-label="Search"/>
        <button class="btn btn-outline-dark" onClick={catchStatus}>Search</button>
      </div>
        {
          status.length>0? status.map((value, index) => {
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
      : <><NotFoundComponent/></>
    }
      </div>
}
    </div>
   
    </>
  )
};
export default Dashboard;
