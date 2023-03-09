import axios from "axios";
import AuthVerify from "./plugins";
const headers = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}
export const getStatus = async (params) => { 
    return axios.get("http://localhost:8000/api/status",params, {headers})
};
export const findStatus = async (id) => {
    return axios.get("http://localhost:8000/api/status/"+id, {headers})
};
export const createComment = async (formData) => {
    return axios.post("http://localhost:8000/api/comment/",formData, {headers})
};
export const findComment = async (id) => {
    return axios.get("http://localhost:8000/api/comment/"+id, {headers})
};
export const UpdateComment = async (id,formData) => {
    return axios.post("http://localhost:8000/api/comment/"+id,formData, {headers})
};
export const createStatus = async (formData) => {
    return axios.post("http://localhost:8000/api/status/",formData, {headers})
};
export const editStatus = async (id,formData) => {
    return axios.post("http://localhost:8000/api/status/"+id,formData, {headers})
};
export const likeStatus = async (id) => {
    return axios.post("http://localhost:8000/api/like/"+id, {headers})
};
export const likeComment = async (id) => {
    return axios.post("http://localhost:8000/api/like_comment/"+id, {headers})
};
export const deleteComment = async (id) => {
    return axios.delete("http://localhost:8000/api/comment/"+id, {headers})
};
export const deleteStatus = async (id) => {
    return axios.delete("http://localhost:8000/api/status/"+id, {headers})
};
