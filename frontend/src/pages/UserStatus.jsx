import React from "react";
import "./../assets/css/dashboard.css"
import "../component/ItemStatus"
import avatar from "./../assets/img/bg2.png"
import { ToastContainer, toast } from 'react-toastify';
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
    const [update, setUpdate] = useState(useReducer((x) => x + 1, 0));
    const [status, setStatus] = useState([]);
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
                    catchStatus();
                    setformStatus('');
                });
            } else {
                console.log(idUpdate, formStatus);
                await editStatus(idUpdate, formData,).then((response) => {
                    invokeModal(false)
                    toast.success('Update Status Success !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    catchStatus();
                    setFormupdate(false);
                    setformStatus('');
                });
            }
        } catch (error) {
            toast.warning('Error in add Status !', {
                position: toast.POSITION.TOP_RIGHT
            });
            catchStatus();
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
    const catchStatus = async () => {
        try {
            if(loadctrl==0){
                setLoadctrl(loadctrl+1);
                setIsLoading(true)
            }
            console.log(JSON.parse(localStorage.getItem('user')).id)
            getStatus({ params: { user_id: JSON.parse(localStorage.getItem('user')).id } },)
                .then((response) => {
                    setStatus(response.data);
                    setIsLoading(false)
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        catchStatus();
    },[update] );
    return (
        <>
            <div className="mother-wall">
            {isLoading ? <LoadingComponent /> :
                <div className="wall1">
                    <ToastContainer />
                    <div className="title-user-status">
                        <div>Your Status</div>
                        <div className="button"> <button class="btn btn-outline-yellow " aria-current="page" href="#" onClick={initModal}>Add Status</button></div>
                    </div>

                    {
                        status.length > 0 ? status.map((value, index) => {
                            return (
                                <>

                                    <CrudStatusComponent
                                        fungsi={updateStatus}
                                        id={value.id}
                                        key={value}
                                        avatar={avatar}
                                        name={value.users.name}
                                        created_at={value.created_at}
                                        content={value.detail}
                                        render={catchStatus} />

                                </>
                            )

                        })
                            : <><NotFoundComponent /></>
                    }
                </div>
                }
            </div>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Add Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Detail Status</label>
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
