import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.css"
import logo from './Greddit.png'
import Navbar from 'react-bootstrap/Navbar';



export default function Home() {

    let navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("sessionToken") === "loggedout" || localStorage.getItem("sessionToken") === null) {
            navigate("/home");
        }
        var token = localStorage.getItem('token');
        const id = localStorage.getItem('subgrediit')
        const options = {
            headers: {
                Authorization: `${token}`
            }
        };
        fetch(`http://localhost:5000/api/subgrediit/${id}/main`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

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
            <center>
            <h1>Users Joined</h1>
            <br></br>
            {data &&
                <ul>
                    {data.map((item) => (
                        <li key={item._id}>
                            <h2>{item.joinedby}</h2>
                        </li>
                    ))}
                </ul>
            }
            </center>
        </>
    )
}