import React from "react";

import "../component/ItemStatus"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap'
import avatar from "./../assets/img/bg2.png"
import ItemStatus from "../component/ItemStatus";
import ItemComment from "../component/ItemComment";
import LoadingComponent from "../component/LoadingComponent";
import "./../assets/css/StatusComment.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, findStatus, UpdateComment, findComment } from "../service";
const StatusComment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [updateChild, setUpdateChild] = useState(0);
    const [idUpdateCom, setIdupdateCom] = useState(0);
    const [update, setUpdate] = useState('');
    const [loadctrl, setLoadctrl] = useState(0);
    const [Comment, setComment] = useState([]);
    const [status, setStatus] = useState('');
    const [formComment, setFormComment] = useState('');
    const [errorform, setError] = useState([]);
    const [replyId, setReplyId] = React.useState(null);
    const { id } = useParams();
    const [isShow, invokeModal] = React.useState(false)
    document.title = "Status";
    const initModal = () => {
        setReplyId(null)
        if (isUpdated == true) {
            setIsUpdated(false)
        }
        if (isShow == false) {
            return invokeModal(true)
        }
        else {
            return invokeModal(false)
        }
    }
    const setRenderDelete = (id) => {
        var array = [...Comment]; // make a separate copy of the array
        const idx = array.findIndex(item => item.comment_id === id)
        array.splice(idx, 1);
        setComment(array);
        // setUpdateChild(updateChild+1)
    }
    const renderReplyDelete= (id)=>{
        var array = [...Comment]; // make a separate copy of the array
        const idx = array.findIndex(item => item.comment_id === id)
        array[idx].reply_total= array[idx].reply_total-1;
        setComment(array);
    }
    const addReply = (id) => {
        setReplyId(id);
        invokeModal(true);
    }
    const submitComment = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("status_id", id);
        formData.append("comment", formComment);
        formData.append("reply_id", replyId);

        try {
            if (isUpdated == false) {
                await createComment(formData).then((response) => {
                    invokeModal(false)

                    toast.success('Add Comment Success !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if (replyId == null) {
                        var array = [...Comment];
                        var newdata = [response.data.data];
                        var joinarr = newdata.concat(array);
                        setComment(joinarr);
                    }else{
                        var array = [...Comment]; 
                        const idx = array.findIndex(item => item.comment_id === response.data.data.reply_id)
                        array[idx].reply_total= array[idx].reply_total+1;
                        setComment(array);
                    }
                    setUpdateChild(updateChild + 1)

                    setReplyId(null);
                });
            } else {
                await UpdateComment(idUpdateCom, formData).then((response) => {
                    invokeModal(false)
                    toast.success('Add Comment Success !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if (replyId == null) {
                        var array = [...Comment]; // make a separate copy of the array
                        const idx = array.findIndex(item => item.comment_id === response.data.data.comment_id)
                        array[idx] = response.data.data;
                        setComment(array);
                    }
                    setReplyId(null);
                });
            }
            setFormComment('');
        } catch (error) {
            setError(error.response.data.errors);

        }
    };
    const getStatus = async () => {
        try {
            if (loadctrl == 0) {
                setLoadctrl(loadctrl + 1);
                setIsLoading(true)
            }
            findStatus(id).then((response) => {
                setComment([...Comment, ...response.data.data.comments])
                setStatus({
                    id: response.data.data.id,
                    user_name: response.data.data.users.name,
                    like_count: response.data.data.like_count,
                    likes_count: response.data.data.likes_count,
                    detail: response.data.data.detail,
                    created_at: response.data.data.created_at,
                });
                setIsLoading(false);

            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleComment = async (id) => {
        try {
            await findComment(id).then((response) => {
                invokeModal(true);
                setIdupdateCom(id)
                setIsUpdated(true);
                setFormComment(response.data.data.comment)

            });
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getStatus();
    }, [update]);
    return (
        <>
            <div className="mother-wall">
                {isLoading ? <LoadingComponent /> :
                    <div className="wall1">
                        <div className="title">
                            Post
                        </div>
                        {
                            status ?
                                <>
                                    <ToastContainer />

                                    <ItemStatus id={status.id} key={status} avatar={avatar} like_count={status.like_count} likes_count={status.likes_count} name={status.user_name} created_at={status.created_at} content={status.detail} />

                                    <div className="title-comment"><div>All Comment</div> <div className="button-add-comment"><button className="btn btn-yellow " onClick={initModal}>Add Comment</button></div></div>
                                    {
                                        Comment.length > 0 ?
                                            <>{Comment.map((value, index) => {
                                                return (<div key={index}>
                                                    <ItemComment
                                                        avatar={avatar}
                                                        replytotal={value.reply_total}
                                                        like={value.like_comment_count}
                                                        likes={value.likes_comment_count}
                                                        name={value.users.name}
                                                        id_user={value.user_id}
                                                        setid={setReplyId}
                                                        id={value.comment_id}
                                                        setrender={setRenderDelete}
                                                        handleUpdate={handleComment}
                                                        created_at={value.updated_at}
                                                        content={value.comment}
                                                        createReply={addReply}
                                                        renderReply={updateChild}
                                                        renderReplyDelete={renderReplyDelete} />
                                                </div>)
                                            })}
                                            </> : <div className="text-center fw-bold">no data more</div>}</>
                                : <><div>no data</div></>
                        }</div>}
            </div>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                        <textarea
                            className={`form-control ${errorform?.comment ? "is-invalid" : ""}`}
                            id="exampleFormControlTextarea1" rows="3"
                            onChange={(e) => setFormComment(e.target.value)}
                            value={formComment}
                        />
                        {errorform?.comment &&
                            <span className='invalid-feedback'>{errorform.comment}</span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-yellow " onClick={initModal}>
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
