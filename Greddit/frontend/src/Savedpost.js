import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import "./Home.css"
import logo from './Greddit.png'
import Navbar from 'react-bootstrap/Navbar';
import { FaHome } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaGoodreadsG } from 'react-icons/fa';
import { SiReddit } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";


export default function Home() {
    let navigate = useNavigate();


    const [post, setPost] = useState([]);
    const [form, setForm] = useState(false);
    const [comment_form, setComment_form] = useState(false);
    const [comment, setComment] = useState('');
    const [id, setId] = useState('');

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
    const handleComment = async (id2) => {
        setId(id2);
        setComment_form(true);
    }
    const handleCancel = () => {
        setId(null);
        setComment_form(false);
    }
    const sendComment = () => {
        var token = localStorage.getItem('token');
        console.log(token);
        console.log(comment);

        fetch('http://localhost:5000/api/subgrediit/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                comment: comment,
                id: id

            })
        })
            .then(response => response.json())
            .then(post => {
                console.log(post);
            })
            .catch(error => {
                console.error(error);
            });
        setForm(false);
        window.location.reload();

    }
    const handleupvote = async (id) => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/subgrediit/upvote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                id: id,
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
    const handleRemove = async (id) => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/subgrediit/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                id: id,
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
    const handledownvote = async (id) => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/subgrediit/downvote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                id: id,
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
    const handlefollow = async (id) => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/subgrediit/follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                id: id,
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

    useEffect(() => {
        if (localStorage.getItem("sessionToken") === "loggedout" || localStorage.getItem("sessionToken") === null) {
            navigate("/home");
        }
        var token = localStorage.getItem('token');
        const options = {
            headers: {
                Authorization: `${token}`
            },
        };
        fetch(`http://localhost:5000/api/subgrediit/showsaved`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPost(data);
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
            <div class='container'>
                <div class='row'>
                    
                    <div class='col'>
                        <center>
                            
                            <div>
                                {post.map((item) => (
                                    <div className="container_1">
                                        <div className="post-card">
                                            <div className="post-card__nav">
                                                <ul >
                                                    <li>
                                                        <a href="#" className="active"><i className="ion ion-ios-eye"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="post-card__content" key={item._id}>
                                                <h3>{item.text}</h3>
                                                <br></br>
                                            </div>
                                                {comment_form ? (
                                                    <form
                                                        className='edit-form'
                                                        onSubmit={(event) => {
                                                            event.preventDefault();
                                                            navigate("/");
                                                        }}>
                                                        <div className="row row-space">
                                                            <center>
                                                                <div className="col-2">
                                                                    <div className="input-group">
                                                                        <label className="label">Comment</label>
                                                                        <input type="text" onChange={(e) => setComment(e.target.value)} className="input--style-4" />
                                                                    </div>

                                                                </div>
                                                            </center>
                                                        </div>
                                                        <button className="btn btn-dark btn-lg px-5" type="submit" onClick={sendComment}>Submit</button>
                                                        {" "}{" "}{" "}{" "}{"     "}
                                                        <button className="btn btn-dark btn-lg px-5" type="submit" onClick={handleCancel}>Cancel</button>

                                                    </form>
                                                )
                                                    : (null)


                                                }

                                            <br></br>
                                            <div>
                                                <h6>Posted by - {item.postedby}</h6>
                                                <h5>upvotes - {item.upvotedby.length}</h5>
                                                <h5>downvotes - {item.downvotedby.length}</h5>
                                                <h5>comments - {item.comment.length}</h5>
                                            </div>

                                        </div>
                                        <button className="btn btn-dark px-3" type="submit" onClick={() => handleupvote(item._id)}>Upvote</button>
                                        {" "}{" "}{" "}{" "}{"     "}
                                        <button className="btn btn-dark btn-lg px-3" type="submit" onClick={() => handledownvote(item._id)}>Downvote</button>
                                        {" "}{" "}{" "}{" "}{"     "}
                                        <button className="btn btn-dark px-3" type="submit" onClick={() => handlefollow(item._id)} >Follow</button>
                                        {" "}{" "}{" "}{" "}{"     "}
                                        <button className="btn btn-dark btn-lg px-3" type="submit" onClick={() => handleComment(item._id)}>Add comment</button>
                                        {" "}{" "}{" "}{" "}{"     "}
                                        <button className="btn btn-dark btn-lg px-3" type="submit" onClick={() => handleRemove(item._id)}>Remove</button>

                                    </div>
                                ))}
                            </div>
                        </center>
                    </div >

                </div>
            </div>
        </>
    )
}
