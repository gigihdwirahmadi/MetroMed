import React from "react";
import "./../assets/css/dashboard.css"
import "../component/ItemStatus"
import avatar from "./../assets/img/bg2.png"
import { ToastContainer, toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Modal, Button } from 'react-bootstrap'
import LoadingComponent from "../component/LoadingComponent";
import { NavLink } from "react-router-dom"
import CrudStatusComponent from "../component/CrudStatusComponent";
import axios from "axios";
import { useEffect, useRef, useState, useReducer } from "react";
import NotFoundComponent from "../component/NotFoundComponent";
import { getStatus, createStatus, findStatus, editStatus } from "../service";

const UserStatus = () => {
    const [isShow, invokeModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formupdate, setFormupdate] = useState(false);
    const [loadctrl, setLoadctrl] = useState(0);
    const [errorform, setError] = useState('')
    const [formStatus, setformStatus] = useState('');
    const [idUpdate, setIdupdate] = useState('')
    const [update, setUpdate] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [status, setStatus] = useState([]);
    const [page, setPage] = useState(1);
     const [hasMore, setHasMore] = useState(true);
    document.title = "MyStatus";
    const initModal = () => {
        if (isShow == false) {
            return invokeModal(true)
        }
        else {
            if (formupdate == true) {
                setFormupdate(false)
            }
            return invokeModal(false)
        }
    }
    const nextScroll= async()=>{
        // await setPage(page+1).then((response)=> catchStatus())
        setPage(page+1);
        setUpdate(update+1);
      }
    const submitStatus = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("detail", formStatus);
        try {
            if (formupdate == false) {
                await createStatus(formData).then((response) => {
                    invokeModal(false)
                    toast.success('Add status Success !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    var newdata= [response.data.data]
                    var array = status;
                    var newarray= newdata.concat(array) 
                    console.log(newarray)
                    setStatus(newarray);
                    setformStatus('');
                });
            } else {
                console.log(idUpdate, formStatus);
                await editStatus(idUpdate, formData,).then((response) => {
                    invokeModal(false)
                    toast.success('Update Status Success !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    var array = [...status]; // make a separate copy of the array
                    const idx = array.findIndex(item => item.id === idUpdate)
                    array[idx]= response.data;
                    setStatus(array);
                    setFormupdate(false);
                    setformStatus('');
                });
            }
        } catch (error) {
            toast.warning('Error in add Status !', {
                position: toast.POSITION.TOP_RIGHT
            });
            setError(error.response.data.errors);
        }
    };
    const updateStatus = async (id) => {
        setFormupdate(true);
        try {
            await findStatus(id).then((response) => {
                invokeModal(true);
                setIdupdate(id);
                setformStatus(response.data.data.detail)
            });
        } catch (error) {
        }
    };
    const renderdelete=(id)=>{
        var array = [...status]; // make a separate copy of the array
        const idx = array.findIndex(item => item.id === id)
        
          array.splice(idx, 1);
          setStatus(array);
    }
    const catchStatus = async () => {
        console.log('ada')
        try {
            if(loadctrl==0){
                setLoadctrl(loadctrl+1);
                setIsLoading(true)
            }
        
            console.log(JSON.parse(localStorage.getItem('user')).id)
            getStatus({ params: { user_id: JSON.parse(localStorage.getItem('user')).id, page: page } },)
                .then((response) => {
                    if (response.data.data.length < 7) {
                              setHasMore(false)
                        }
                        setStatus([...status, ...response.data.data])
                    
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        catchStatus();
    },[update] );
    useEffect(() => {
        // array of words
        const words = formStatus.split(' ');
    
        // update word count
        let wordCount = 0;
        words.forEach((word) => {
          if (word.trim() !== '') {
            wordCount++;
          }
        });
        setWordCount(wordCount);
      }, [formStatus]);
    return (
        <>
        <div className="mother-wall">
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
                <div className="wall1">
                    <ToastContainer />
                    <div className="title-user-status">
                        <div>Your Status</div>
                        <div className="button"> <button class="btn btn-outline-yellow " aria-current="page" href="#" onClick={initModal}>Add Status</button></div>
                    </div>

                    {
                        status.length > 0 ? status.map((value, index) => {
                            return (
                                <div key={index}>

                                    <CrudStatusComponent
                                        fungsi={updateStatus}
                                        id={value.id}
                                        avatar={avatar}
                                        name={value.users.name}
                                        created_at={value.created_at}
                                        content={value.detail}
                                        render={renderdelete} />

                                </div>
                            )

                        })
                            : <></>
                    }
                </div>
                </InfiniteScroll>
            </div>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Add Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                      <div className="label">
                        <span><label for="exampleFormControlTextarea1" className="form-label">Detail Status</label></span><div className="wordCount">{wordCount} word</div></div>
                        <textarea
                            className={`form-control ${errorform?.detail ? "is-invalid" : ""}`}
                            id="exampleFormControlTextarea1" rows="7"
                            onChange={(e) => setformStatus(e.target.value)}
                        >{formStatus}</textarea>
                        {errorform?.detail &&
                            <span className='invalid-feedback'>{errorform.detail}</span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-yellow text-white" onClick={initModal}>
                        Close
                    </button>
                    <Button variant="dark" onClick={submitStatus}>
                        Store
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
};
export default UserStatus;
