import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.css"
import logo from './Greddit.png'
import capybara from './capybara.png'
import Navbar from 'react-bootstrap/Navbar';
import './Sg.css'
import { FaHome } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaGoodreadsG } from 'react-icons/fa';
import { AiFillDelete } from "react-icons/ai";
import { IoOpenSharp } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { SiReddit } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";
import { FaUserAlt } from 'react-icons/fa';
import { TbArrowsJoin } from 'react-icons/tb';
import { MdReportProblem } from "react-icons/md"
// import regex from "regex"


export default function Home() {

    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [forms, setForm] = useState(false);
    const [comment_form, setComment_form] = useState(false);
    const [text, setText] = useState('');
    const [comment, setComment] = useState('');
    const [post, setPost] = useState([]);
    const [id, setId] = useState('');

    function handleSubmit5() {
        navigate("/users");
    }
    function handleSubmit6() {
        navigate("/joinreq");
    }
    function handleSubmit7() {
        navigate("/stats");
    }
    function handleSubmit8() {
        navigate("/report");
    }
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



    const handlePost = (event) => {
        event.preventDefault();

        const original = text;
        const bannedWords = data[0].bankey[0].split(",");
        console.log(bannedWords);
        const regex = new RegExp(bannedWords.join("|"), "gi");
        const replacement = text.replace(regex, match => "*".repeat(match.length));
        setText(replacement);
        console.log(replacement);


        var token = localStorage.getItem('token');
        console.log(token);
        var id = localStorage.getItem('subgrediit');

        fetch('http://localhost:5000/api/subgrediit/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                text: replacement,
                postedin: id,
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
        // window.location.reload();

        if (replacement !== original) {
            alert("Your post contains the banned word");
        }
        window.location.reload();

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
        // console.log(token);
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
    const handlesave = async (id) => {

        var token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:5000/api/subgrediit/save', {
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
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                id: id,
            })
        }
        fetch('http://localhost:5000/api/subgrediit/follow', options)
            .then(response => response.json())
            .then(post => {
                console.log(post);
            })
            .catch(error => {
                console.error(error);
            });
        fetch('http://localhost:5000/api/subgrediit/following', options)
            .then(response => response.json())
            .then(post => {
                console.log(post);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (localStorage.getItem("sessionToken") === "loggedout" || localStorage.getItem("sessionToken") === null) {
            navigate("/home");
        }
        var token = localStorage.getItem('token');
        var id = localStorage.getItem('subgrediit');
        // console.log(token);
        // console.log(id);
        const options = {
            headers: {
                Authorization: `${token}`
            },
        };
        fetch(`http://localhost:5000/api/subgrediit/${id}/allpost`, options)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setPost(data);
            })
            .catch(error => {
                console.log(error);
            });
        console.log("dcown")

        fetch(`http://localhost:5000/api/subgrediit/${id}/main`, options)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
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

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit5}><FaUserAlt size={25} className="icon" />Users</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit6}><TbArrowsJoin size={25} className="icon" />Joining Requests</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit7}><IoIosStats size={25} className="icon" />Stats</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleSubmit8}><MdReportProblem size={25} className="icon" />Reported Page</a>
                            </li>



                        </ul>

                        <div>
                            <button className="btn btn-dark btn-lg px-4" type="submit" onClick={handleSubmit}>Logout</button>
                        </div>
                        <div></div>
                    </div>
                </Navbar>
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
                                <div className="input-group">
                                    <label className="label">Text</label>
                                    <input type="text" onChange={(e) => setText(e.target.value)} className="input--style-4" />
                                </div>
                            </div>
                        </center>
                    </div>
                    <button className="btn btn-dark btn-lg px-5" type="submit" onClick={handlePost}>Submit</button>
                    {" "}{" "}{" "}{" "}{"     "}
                    <button className="btn btn-dark btn-lg px-5" type="submit" onClick={() => setForm(false)}>Cancel</button>

                </form>
            )
                : (null)


            }


            <div class='container'>
                <div class='row'>
                    <div class='col'>
                        <img src={capybara} width={200} height={300}></img>
                        {data &&
                            <ul>
                                {data.map((item) => (
                                    <li key={item._id}>
                                        <h2>Name - {item.name}</h2>
                                        <h2>Description - {item.desc}</h2>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                    <div class='col'>
                        <center>
                            <div>
                                <button className="btn btn-dark btn-lg px-4" type="submit" onClick={() => setForm(true)}>Create Post</button>

                            </div>
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
                                        <button className="btn btn-dark px-3" type="submit" onClick={() => handlesave(item._id)}>Save</button>
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