import React from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Logout = ({ setUser }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        (async () => {
           await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, null, {
               withCredentials: true
           })
               .then(res => {
                   if(res.status === 200){
                       setUser(0)
                       toast.success(res.data.message)
                       navigate('/')
                   }else {
                       toast.error("Une erreur est survenue")
                   }
               })
               .catch(err => console.log(err.message))
        })()
    }
    return (
        <span className={"logout"} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor"
                 className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd"
                      d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                <path fillRule="evenodd"
                      d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
            </svg>
        </span>
    );
};

export default Logout;