import React from "react";
import "../component/ItemStatus"
import { Modal, Button } from 'react-bootstrap'
import avatar from "./../assets/img/bg2.png"
import ItemStatus from "../component/ItemStatus";
import ItemComment from "../component/ItemComment";
import axios from "axios";
import "./../assets/css/StatusComment.css"
import { useEffect, useRef, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import { createComment } from "../service";
const StatusComment = () => {
    const [update, setUpdate] = useState();
    const [status, setStatus] = useState();
    const [formComment, setFormComment] = useState();
    const [errorform, setError] = useState([]);
    const { id } = useParams();
    const [isShow, invokeModal] = React.useState(false)
    const initModal = () => {
        if (isShow == false) {
            return invokeModal(true)
        }
        else {
            return invokeModal(false)
        }
    }
    const setRender = () => {
       getStatus()
    }
    const submitComment = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("status_id", id);
        formData.append("comment", formComment);

        try {
            await axios.post("http://localhost:8000/api/comment/",formData, { headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }},).then((response) => {
                invokeModal(false)
                setRender()
            });
        } catch (error) {
            setError(error.response.data.errors);
        }
    };


    const baseURL = `http://localhost:8000/api/status/${id}`
    const getStatus = async () => {
        try {
            const response = await axios.get(baseURL, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
               
                setStatus(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStatus();
    }, [update]);
    return (
        <>
            <div className="mother-wall">
                <div className="wall1">
                    <div className="title">
                        Post
                    </div>
                    {
                        status ?
                            <>
                                <ItemStatus key={status} avatar={avatar} name={status.users.name} created_at={status.created_at} content={status.detail} />
                                <div className="title-comment"><div>All Comment</div><div className="button-add-comment"><button className="btn btn-yellow text-white" onClick={initModal}>Add Comment</button></div></div>
                                {
                                    status?.comments.length > 0 ?
                                        <>
                                            {
                                                status.comments.map((value, index) => {
                                                    return (<>
                                                        <ItemComment key={index} avatar={avatar} name={value.name} id_user={value.user_id} id={value.comment_id} setrender={setRender} created_at={value.created_at} content={value.comment} />
                                                    </>)
                                                })

                                            }
                                        </>
                                        : <div>no comments</div>
                                }
                            </>
                            : <><div>no data</div></>
                    }



                </div>
            </div>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
                        <textarea
                            className={`form-control ${errorform?.comment ? "is-invalid" : ""}`}
                            id="exampleFormControlTextarea1" rows="3"
                            onChange={(e) => setFormComment(e.target.value)}
                        >{formComment }</textarea>
                        {errorform?.comment &&
                            <span className='invalid-feedback'>{errorform.comment}</span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-yellow text-white" onClick={initModal}>
                        Close
                    </button>
                    <Button variant="dark" onClick={submitComment}>
                        Store
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};
export default StatusComment;
