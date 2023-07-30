import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.css"
import logo from './Greddit.png'
import Navbar from 'react-bootstrap/Navbar';
import { FaHome } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaGoodreadsG } from 'react-icons/fa';
import { AiFillDelete } from "react-icons/ai";
import { IoOpenSharp } from "react-icons/io5";
import { SiReddit } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";



export default function Home() {

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("sessionToken") === "loggedout" || localStorage.getItem("sessionToken") === null) {
            navigate("/home");
        }
    },[])

    return (
        <>
            <div>
            <Navbar className="bg-nav" expand="lg">
                    <nav><img className="image" src={logo} width={70} height={70} /></nav>
                    <Navbar.Brand href="#home" className="logo-name">Greddit</Navbar.Brand>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        <div></div>
                    </div>
                </Navbar>
            </div>
            </>
    )
}