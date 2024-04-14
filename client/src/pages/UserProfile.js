import React, { useEffect, useState } from "react";
// import Layout from "./../../components/Layout";
import axios from "axios";
import { useNavigate  , useParams} from "react-router-dom";
// import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { Spin, Card  } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { setUser } from "../redux/features/userSlice";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/user/getUserData",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          dispatch(setUser(res.data.data));
        } 
      } catch (error) {
        localStorage.clear();
        dispatch(hideLoading());
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (!user) {
        getUser();
      }
    }, [user, getUser]);
  return (
    <div>
      <Layout>
    
      <div style={{ padding: "50px" }}>
      {user && (
        <Card title="User Profile">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Is Admin: {user.isAdmin ? "Yes" : "No"}</p>
          <p>Is Doctor: {user.isDoctor ? "Yes" : "No"}</p>
          {/* Add more fields as needed */}
        </Card>
      )}
    </div>
      </Layout>
    </div>
  )
}

export default UserProfile
