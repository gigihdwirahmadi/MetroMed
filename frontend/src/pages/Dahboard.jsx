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
  const [update, setUpdate] = useState(0);
  const [status, setStatus] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true)
  const [param, setParam]= useState('');

  const catchStatus = async () => {
    try {
      
      await getStatus({params:{search:param, page:page}}).then((response) => {   
        console.log(response.data.data)
        if (response.data.data.length <7) {
                setHasMore(false)
              }
        setStatus([...status, ...response.data.data])
        console.log(status)
        setIsLoading(false);
    });
    } catch (error) {
      console.log(error);
    }
  };
  const nextScroll= async()=>{
    // await setPage(page+1).then((response)=> catchStatus())
    setPage(page+1);
    setUpdate(update+1);
  }
  const onSearch= async()=>{
    setPage(1);
    setStatus([]);
    setUpdate(update+1);
  }
  useEffect(() => {
  catchStatus();
  }, [update]);
 
     
  return (
    <>
    <div className="mother-wall">
    
      <div className="wall1">
        <div className="title">
          <div className="text"></div>
          
        </div>
        <div className="d-flex">
        <input className="form-control me-2" value={param} placeholder="Search" onChange={(e) => setParam(e.target.value)} aria-label="Search"/>
        <button className="btn btn-outline-dark" onClick={onSearch}>Search</button>
      </div>
      <InfiniteScroll
          dataLength={status.length}
          next={nextScroll}
          hasMore={hasMore}
          loader={<LoadingComponent/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>no data more</b>
            </p>
          }
        >
        {
          status.length>0 ? status.map((value, index) => {
        return (
        <div key={index}>
       
            <NavLink
            to={`/status/${value.id}`}
            className="NavLink"
          >
          <ItemStatus id={value.id} key={value} avatar={avatar} name={value.users.name} created_at={value.created_at} like_count={value.like_count} likes_count={value.likes_count} content={value.detail}/>
          </NavLink>

        </div>
       
        )
       
      })
      : <></>
    }
</InfiniteScroll>
      </div>

    </div>
   
    </>
  )
};
export default Dashboard;
