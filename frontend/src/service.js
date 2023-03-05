import axios from "axios";
const headers = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}
export const getStatus = async (params) => {
    return axios.get("http://localhost:8000/api/status/",params, {headers})
};
export const createComment = async (formData) => {
    return 
};
export const deleteComment = async (id) => {
    return axios.delete("http://localhost:8000/api/comment/"+id, {headers})
};