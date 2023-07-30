import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import "./Home.css"
import logo from './Greddit.png'
import user_img from './user.png'
import Navbar from 'react-bootstrap/Navbar';
import { FaHome } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaGoodreadsG } from 'react-icons/fa';
import { SiReddit } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";


export default function Home() {
    let navigate = useNavigate();
    const { state } = useLocation();
    const [user, setUser] = useState([]);
    const [vari, setVari] = useState('');
    const [follower, setFollower] = useState("");
    const [forms, setForm] = useState(false);
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');




    function handleSubmit() {
        localStorage.setItem("sessionToken", "loggedout");
        navigate("/home");
    }
    useEffect(() => {
        if (localStorage.getItem("sessionToken") === "loggedout" || localStorage.getItem("sessionToken") === null) {
            navigate("/home");
        }
        var token = localStorage.getItem('token');

        console.log(token);

        const options = {
            headers: {
                Authorization: `${token}`
            },
        };
        fetch(`http://localhost:5000/api/profile`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
                console.log(user);
                if (user) {
                    const userData = user[0];

                    console.log(userData.first_name);
                    setFname(userData.first_name);
                    setLname(userData.last_name);
                    setAge(userData.age);
                    setPhone(userData.phone);
                }


            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleSubmit2() {

        navigate("/mysg");
    }
    function handleSubmit3() {

        navigate("/sg");
    }
    function handleSubmit4() {
        console.log("bjbw");
        navigate("/savedpost");
    }

    const handleRemove = async (name) => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/subgrediit/removefollow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                name: name,
            })
        })
            .then(response => response.json())
            .then(post => {
                console.log(post);
            })
            .catch(error => {
                console.error(error);
            });
        window.location.reload();

    }
    const handleUnfollow = async (name) => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/subgrediit/unfollow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                name: name,
            })
        })
            .then(response => response.json())
            .then(post => {
                console.log(post);
            })
            .catch(error => {
                console.error(error);
            });
        window.location.reload();

    }
    const handleEdit = () => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/profile/edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                age: age,
                phone: phone
            })
        })
            .then(response => response.json())
            .then(post => {
                console.log(post);
            })
            .catch(error => {
                console.error(error);
            });
        window.location.reload();

    }
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

            <div className="row py-5 px-4">
                <div className="col-xl-4 col-md-6 col-sm-10 mx-auto">

                    <div className="bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 bg-dark">
                            <div className="media align-items-end profile-header">
                                <center>
                                    <div className="profile mr-3">
                                        <img src={user_img} alt="..." width="140" className="img-temp" />
                                        <div className="media-body mb-5 text-white">
                                            {user.map((item) => (
                                                <div>
                                                    <h2>{item.user_name}</h2>
                                                    <h6>{item.email}</h6>
                                                </div>

                                            ))}
                                        </div>
                                        <button className="btn btn-dark btn-sm btn-block px-4 " onClick={() => setForm(true)}><center>Edit profile</center></button>
                                        {" "}{" "}{"  "}{" "}{" "}{"  "}
                                        <button className="btn btn-dark btn-sm btn-block" data-bs-toggle="modal" data-bs-target="#exampleModal3"><center>Info</center></button></div>

                                </center>
                            </div>
                        </div>

                        {forms ? (
                            <form
                                className='edit-form'
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    navigate("/");
                                }}>
                                <div className="row row-space">
                                    <center>
                                        <div className="col-2">
                                            {user.map((item) => (
                                                <div className="input-group">
                                                    <label className="label">First Name</label>
                                                    <input type="text" value={first_name} onChange={(e) => setFname(e.target.value)} className="input--style-4" />
                                                    <label className="label">Last Name</label>
                                                    <input type="text" value={last_name} onChange={(e) => setLname(e.target.value)} className="input--style-4" />
                                                    <label className="label">Age</label>
                                                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input--style-4" />
                                                    <label className="label">Phone No.</label>
                                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="input--style-4" />
                                                </div>

                                                // <div className="input-group">
                                                //     <label className="label">First Name</label>
                                                //     <input type="text" value={item.first_name} onChange={(e) => setFname(e.target.value)} className="input--style-4" />
                                                //     <label className="label">Last Name</label>
                                                //     <input type="text" value={item.last_name} onChange={(e) => setLname(e.target.value)} className="input--style-4" />
                                                //     <label className="label">Age</label>
                                                //     <input type="text" value={item.age} onChange={(e) => setAge(e.target.value)} className="input--style-4" />
                                                //     <label className="label">Phone No.</label>
                                                //     <input type="text" value={item.phone} onChange={(e) => setPhone(e.target.value)} className="input--style-4" />
                                                // </div>
                                            ))}
                                        </div>
                                    </center>
                                </div>
                                <button className="btn btn-dark btn-lg px-5" type="submit" onClick={() => setForm(false)}>Cancel</button>
                                {" "}{" "}{" "}{" "}{"     "}
                                <button className="btn btn-dark btn-lg px-5" type="submit" onClick={() => { handleEdit() }}>Submit</button>

                            </form>
                        )
                            : (null)


                        }


                        <div className="bg-light p-4 d-flex justify-content-end text-center">

                        </div>

                        <center>
                            <div>
                                <br></br>

                                <a data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    {user.map((item) => (
                                        <div>
                                            <h4>{item.followers.length} Followers </h4>
                                        </div>
                                    ))}
                                </a>
                                <a data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                    {user.map((item) => (
                                        <div>
                                            <h4>{item.following.length} Following </h4>
                                        </div>
                                    ))}
                                </a>
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">List of Followers</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>

                                            <div class="modal-body">
                                                <ul className='list-group'>
                                                    {user.map((item, index) => (
                                                        item.followers.map((follower, index) => (
                                                            <li key={index} class="list-group-item d-flex justify-content-between align-items-center">
                                                                <h4>{follower}</h4>
                                                                <button type="button" class="btn btn-dark btn-lg px-2" onClick={() => (handleRemove(follower))}>Remove</button>

                                                            </li>
                                                        ))
                                                    ))}
                                                </ul>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-dark btn-lg px-3" data-bs-dismiss="modal">Close</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Following List</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            {/* <div class="modal-body">
                                                {user.map((item) => (
                                                    <div class="modal-body">
                                                        {user.map((item) => (
                                                            <ul class="row align-items-center">
                                                                <div class="col-8">
                                                                    <h4>{item.following}</h4>
                                                                </div>
                                                                <div class="col-4 text-right">
                                                                    <button type="button" class="btn btn-dark btn-lg px-2" onClick={() => (handleUnfollow(item.name))}>Unfollow</button>
                                                                </div>
                                                            </ul>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div> */}
                                            <div class="modal-body">
                                                <ul className='list-group'>
                                                    {user.map((item, index) => (
                                                        item.following.map((following, index) => (
                                                            <li key={index} class="list-group-item d-flex justify-content-between align-items-center">
                                                                <h4>{following}</h4>
                                                                <button type="button" class="btn btn-dark btn-lg px-2" onClick={() => (handleUnfollow(following))}>Unfollow</button>
                                                            </li>
                                                        ))
                                                    ))}
                                                </ul>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-dark btn-lg px-3" data-bs-dismiss="modal">Close</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        {user.map((item) => (
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Information of {item.first_name} {item.last_name}</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body" align="left">
                                                    <ul>
                                                        <div>
                                                            <li><h4>First Name - {item.first_name}</h4></li>
                                                            <li><h4>Last Name - {item.last_name}</h4></li>
                                                            <li><h4>Age - {item.age}</h4></li>
                                                            <li><h4>Phone No. - {item.phone}</h4></li>
                                                            <li><h4>Email ID - {item.email}</h4></li>
                                                            <li><h4>UserName - {item.user_name}</h4></li>
                                                        </div>

                                                    </ul>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-dark btn-lg px-3" data-bs-dismiss="modal">Close</button>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </center>



                        <div className="py-4 px-4">

                            <div className="py-4">
                                <h5 className="mb-3">Recent posts</h5>
                                <div className="p-4 bg-light rounded shadow-sm">
                                    <p className="font-italic mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                    <ul className="list-inline small text-muted mt-3 mb-0">
                                        <li className="list-inline-item"><i className="fa fa-comment-o mr-2"></i>12 Comments</li>
                                        <li className="list-inline-item"><i className="fa fa-heart-o mr-2"></i>200 Likes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
