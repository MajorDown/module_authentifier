"use client";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "next/link";
import { Image } from "next/image";

const identifer = () => {
  const identifer = useRef();
  const [isOpen, setisOpen] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("AppUserId") || "");
  const [isConnected, setIsConnected] = useState(false);
  const [inputId, setInputId] = useState("");
  const [inputMdp, setInputMdp] = useState("");

  useEffect(() => {
    if (!userId || userId != "") setIsConnected(false);
    else if (userId) setIsConnected(true);
  }, [userId]);

  useEffect(() => {
    if (isOpen) {
      identifer.current.classList.add("isOpen");
    } else {
      identifer.current.classList.remove("isOpen");
    }
  }, [isOpen]);

  const handleLogin = async () => {
    const userId = inputId;
    const password = inputMdp;
    const res = await fetch("http://API_URL/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });
    if (res.status === 200) {
      const response = await res.json();
      localStorage.setItem("AppUserId", response.userId);
      localStorage.setItem("AppToken", response.token);
      setUserId(localStorage.getItem("AppUserId"));
    } else {
      alert("Échec de la connexion");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("AppToken");
    localStorage.removeItem("AppUserId");
    setUserId("");
  };

  return (
    <div id="identifer" ref={identifer}>
      <button onClick={() => setisOpen(!isOpen)}>
        <Image
          id="identifierBtn"
          src={
            isConnected
              ? "../images/identifier_icons/identifierNotAuth.png"
              : "../images/identifier_icons/identifierAuth.png"
          }
          alt="identifier icon"
          width={30}
          height={30}
        />
      </button>
      {isOpen && (
        <div>
          {isConnected ? (
            <div id="adminForm">
              <button>
                <Link to="/dashboard">
                  <Image
                    id="identifierDisconnect"
                    src="../images/identifer_icons/identiferDashboard.png"
                    alt="Connection"
                    width={30}
                    height={30}
                  />
                </Link>
              </button>
              <p>mode Admin : {userId}</p>
              <button onClick={handleLogout}>
                <Image
                  id="identifierDisconnect"
                  src="../images/identifer_icons/identiferDisconnect.png"
                  alt="Déconnection"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          ) : (
            <div id="adminForm">
              <input
                id="userId"
                name="userId"
                type="text"
                placeholder="identifiant"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="mot de passe"
                value={inputMdp}
                onChange={(e) => setInputMdp(e.target.value)}
              />
              <button onClick={handleLogin}>
                <Image
                  id="identifierConnect"
                  src="../images/identifier_icons/identifierConnect.png"
                  alt="Connection"
                  width={30}
                  height={30}
                />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default identifer;
