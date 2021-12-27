import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";

export default function UserHome() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    else{
    const response = fetch("api/user/verifyToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          localStorage.removeItem("token");
          navigate("/");
        }
      });
    }
  }, []);

  return <div className="user-home">Hello</div>;
}
