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
    const [data, setData] = useState([]);

    const acceptButton = async (id, name) => {
        console.log("ndowsc")

        var token = localStorage.getItem('token');
        console.log("dihwoandxna")
        fetch(`http://localhost:5000/api/subgrediit/${id}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                name: name
            })

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        // window.location.reload();
    }


    const rejectButton = async (id, name) => {
        console.log("ndowsc")

        var token = localStorage.getItem('token');
        console.log("dihwoandxna")
        fetch(`http://localhost:5000/api/subgrediit/${id}/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                name: name
            })

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        // window.location.reload();
    }

    useEffect(() => {
        if (localStorage.getItem("sessionToken") === "loggedout" || localStorage.getItem("sessionToken") === null) {
            navigate("/home");
        }
        var token = localStorage.getItem('token');
        var id = localStorage.getItem('subgrediit');
        console.log("cxbldx wh");
        const options = {
            headers: {
                Authorization: `${token}`
            }
        };

        fetch(`http://localhost:5000/api/subgrediit/${id}/joinreq`, options)
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

            {/* <table class="table">
                            <thead>
                                <tr key={data.joinreq}>
                                    <th><h1>Name</h1></th>
                                    <th></th>

                                </tr>
                            </thead>
                            {data.map((data) => (
                                <tbody>
                                    <tr>
                                        <td>{data.joinreq[0]}</td>
                                        <td><button className="btn btn-dark btn-lg px-4" type="submit" onClick={() => acceptButton(data._id, data.joinreq)}>Accept</button>
                                        <button className="btn btn-dark btn-lg px-4" type="submit" onClick={() => rejectButton(data._id, data.joinreq)}>Reject</button></td>

                                    </tr>
                                </tbody>
                            ))

                            }

                        </table> */}
                        <center>
            <table class="table">
                <thead>

                    <center><h2>Joining Requests</h2></center>
                


                </thead>
                {data.map((row) => (
                    <tbody key={row._id}>
                        {row.joinreq.map((name, index) => (
                            <tr key={index}>
                                <td><h3>{name}</h3></td>
                                <td>
                                    <button className="btn btn-dark btn-lg px-4" type="submit" onClick={() => acceptButton(row._id, name)}>Accept</button>
                                    <button className="btn btn-dark btn-lg px-4" type="submit" onClick={() => rejectButton(row._id, name)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ))}
            </table>
            </center>
            {/* <ul>
                {data.map(item => <li key={item._id}>{item.joinreq}</li>)}
            </ul> */}


        </>
    )
}