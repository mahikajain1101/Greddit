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


    const [forms, setForm] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [tag, setTag] = useState('');
    const [bankey, setBankey] = useState('');

    let navigate = useNavigate();

    const sendData = (e) => {
        var token = localStorage.getItem('token');
        console.log(token);
        e.preventDefault();
        fetch('http://localhost:5000/api/subgrediit/mysg', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            body: JSON.stringify({
                name: name,
                desc: desc,
                tag: tag,
                bankey: bankey
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        setForm(false);
        window.location.reload();

    }

    const deleteButton = async (id) => {
        var token = localStorage.getItem('token');
        console.log("dihwoandxna");
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `${token}`
            },
        };
        const options2 = {
            method: 'POST',
            headers: {
                Authorization: `${token}`
            },
        };
        fetch(`http://localhost:5000/api/subgrediit/mysg/${id}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        console.log("fkdydiedi");
        fetch(`http://localhost:5000/api/subgrediit/${id}/postdelete`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        fetch(`http://localhost:5000/api/subgrediit/${id}/userdelete`, options2)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        window.location.reload();

    }
    const openButton = async (id) => {
        localStorage.setItem("subgrediit", id);
        navigate(`/opensg`);
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

    const [data, setData] = useState([]);
    const [noPost, setNoPost] = useState({});

    const handleNoPost = async (id) => {
        

        var token = localStorage.getItem('token');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/subgrediit/mysg/${id}/nopost`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
            });
            const data = await response.json();
            return data.length;
        } catch (error) {
            console.error(error);
            return 0;
        }
        // fetch(`http://localhost:5000/api/subgrediit/mysg/${id}/nopost`, {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data.length);
        //         setNoPost(data.length);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });


    }

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
        fetch('http://localhost:5000/api/subgrediit/data', options)
            .then(response => response.json())
            .then(data => {
                
                setData(data);
            })
            .catch(error => {
                console.log(error);
            });
        const fetchNoPosts = async () => {
            const newNoPost = {};
            for (const item of data) {
                const count = await handleNoPost(item._id);
                newNoPost[item._id] = count;
            }
            setNoPost(newNoPost);
        };
        fetchNoPosts();
        // data.forEach((item) => handleNoPost(item._id));
    }, [data]);


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
                                    <label className="label">Name</label>
                                    <input type="text" onChange={(e) => setName(e.target.value)} className="input--style-4" />
                                </div>
                                <div className="input-group">
                                    <label className="label">Description</label>
                                    <input type="text" onChange={(e) => setDesc(e.target.value)} className="input--style-4" />
                                </div>
                                <div className="input-group">
                                    <label className="label">Tags</label>
                                    <input type="text" onChange={(e) => setTag(e.target.value)} className="input--style-4" />
                                </div>
                                <div className="input-group">
                                    <label className="label">Banned Keywords</label>
                                    <input type="text" onChange={(e) => setBankey(e.target.value)} className="input--style-4" />
                                </div>
                            </div>
                        </center>
                    </div>
                    <button className="btn btn-dark btn-lg px-5" type="submit" onClick={() => setForm(false)}>Cancel</button>
                    {" "}{" "}{" "}{" "}{"     "}
                    <button className="btn btn-dark btn-lg px-5" type="submit" onClick={sendData}>Submit</button>

                </form>
            )
                : (null)


            }

            <div>
                <center>
                    <div>
                        <button className="btn btn-dark btn-lg px-3" type="submit" onClick={() => setForm(true)}>Create SubGrediit</button>

                    </div>
                    <div>

                        <table class="table">
                            <thead>
                                <tr key={data._id}>
                                    <th>Number of people in the SubGrediit</th>
                                    <th>Number of posts posted in the Sub Greddiit until now</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>List of banned keywords</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {data.map((data) => (

                                <tbody>
                                    <tr>
                                        <td><center><h3>{data.joinedby.length}</h3></center></td>
                                       
                                        <td><center><h3>{noPost[data._id] || 0}</h3></center></td>
                                        <td><h3>{data.name}</h3></td>
                                        <td><h3>{data.desc}</h3></td>
                                        <td><h3>{data.bankey}</h3></td>
                                        <td>
                                            <a className="nav-link active" aria-current="page" onClick={() => deleteButton(data._id)}><AiFillDelete size={20} /></a>
                                        </td>
                                        <td>
                                            <a className="nav-link active" aria-current="page" onClick={() => openButton(data._id)}><IoOpenSharp size={20} /></a>
                                        </td>
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
