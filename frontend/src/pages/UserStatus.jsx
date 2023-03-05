import React from "react";
import "./../assets/css/dashboard.css"
import "../component/ItemStatus"
import avatar from "./../assets/img/bg2.png"
import { Modal, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom"
import ItemStatus from "../component/ItemStatus";
import axios from "axios";
import { useEffect, useRef, useState, useReducer } from "react";
import { getStatus } from "../service";

const UserStatus = () => {
    const [isShow, invokeModal] = useState(false)
    const [errorform, setError] = useState()
    const [formStatus, setformStatus] = useState('');
    const [update, setUpdate] = useState(useReducer((x) => x + 1, 0));
    const [status, setStatus] = useState([]);
    const initModal = () => {
        if (isShow == false) {
            return invokeModal(true)
        }
        else {
            return invokeModal(false)
        }
    }
    const submitStatus = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("detail", formStatus);
        try {
            await axios.post("http://localhost:8000/api/status/", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            },).then((response) => {

                invokeModal(false)
                window.location.reload(true)
            });
        } catch (error) {
            setError(error.response.data.errors);
        }
    };
    const catchStatus = async () => {
        try {
            const param = { user_id: JSON.parse(localStorage.getItem('user')).id };
            console.log(param);
            console.log(axios.defaults.headers.common)
            await getStatus({ params: param }).then((response) => {
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
                    <div class="btn btn-yellow " aria-current="page" href="#" onClick={initModal}>Add Status</div>
                    {
                        status ? status.map((value, index) => {
                            return (
                                <>
                                    <NavLink
                                        to={`/status/${value.id}`}
                                        className="NavLink"
                                    >
                                        <ItemStatus key={value} avatar={avatar} name={value.users.name} created_at={value.created_at} content={value.detail} />
                                    </NavLink>
                                </>
                            )

                        })
                            : <><div>no data</div></>
                    }
                </div>
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
                        >{formStatus }</textarea>
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
