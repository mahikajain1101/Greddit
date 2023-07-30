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


   
    
    function handleSubmit() {
        localStorage.setItem("loggedin", false);
        navigate("/home");
    }
    function handleSubmit2() {

        navigate("/mysg");
    }
    function handleSubmit3() {

        navigate("/sg");
    }
    function handleSubmit4() {
        navigate("/savedpost");
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("sessionToken") === "loggedout" || localStorage.getItem("sessionToken") === null) {
            navigate("/home");
        }
        var token = localStorage.getItem('token');
        const options = {
            headers: {
                Authorization: `${token}`
            }
        };
        fetch('http://localhost:5000/api/subgrediit', options)
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/"><FaHome size={25} className="icon" />Profile</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit} href="/home"><FaSignOutAlt size={25} className="icon" />Sign-up</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit2}><FaGoodreadsG size={25} />My SubGrediits Page</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit3}><SiReddit size={25} className="icon" />SubGrediits</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit4}><MdSaveAlt size={25} className="icon" />SavedPosts</a>
                            </li>


                        </ul>

                        <div>
                            <button className="btn btn-dark btn-lg px-4" type="submit" onClick={handleSubmit}>Logout</button>
                        </div>
                        <div></div>
                    </div>
                </Navbar>
            </div>
            <div>
                <center>
                    <div>

                        <table class="table">
                            <thead>
                                <tr key={data._id}>
                            
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>List of banned keywords</th>
                                    
                                </tr>
                            </thead>
                            {data.map((data) => (
                                <tbody>
                                    <tr>
                                       
                                        <td>{data.name}</td>
                                        <td>{data.desc}</td>
                                        <td>{data.bankey}</td>
                                        
                                    </tr>
                                </tbody>
                            ))

                            }

                        </table>
                    </div>
                </center>


            </div>



        </>
    )
}
