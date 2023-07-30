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
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import Fuse from 'fuse.js';

export default function Home() {

    let navigate = useNavigate();
    const fuseOptions = {
        keys: ['name'],
        includeScore: true,
        threshold: 0.3
    };

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
    function sortButton() {
        setData([...data.sort((a, b) => a.name.localeCompare(b.name))]);
        setJoined([...joined.sort((a, b) => a.name.localeCompare(b.name))]);
    }
    function sortdescButton() {
        setData([...data.sort((a, b) => b.name.localeCompare(a.name))]);
        setJoined([...joined.sort((a, b) => b.name.localeCompare(a.name))]);
    }
    function sortFollowers() {
        setData([...data.sort((a, b) => b.joinedby.length - a.joinedby.length)]);
        setJoined([...joined.sort((a, b) => b.joinedby.length - a.joinedby.length)]);
    }
    function sortByCreationTime() {
        setData(original);
        setJoined(orgjoin);
    }
    const joinButton = async (id) => {
        console.log("ndowsc")
        var token = localStorage.getItem('token');
        console.log("dihwoandxna")
        fetch(`http://localhost:5000/api/subgrediit/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        alert("Joining Request Sent");

        window.location.reload();
    }

    const leaveButton = async (id) => {

        var token = localStorage.getItem('token');
        fetch(`http://localhost:5000/api/subgrediit/${id}/leave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `${token}` },

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });

        window.location.reload();
    }


    const [data, setData] = useState([]);
    const [original, setOriginal] = useState([]);

    const [orgjoin, setOrgjoin] = useState([]);

    const [joined, setJoined] = useState([]);
    const [user, setUser] = useState([]);
    const fuse = new Fuse(data, fuseOptions);

    const [filteredSubGreddits, setFilteredSubGreddits] = useState([]);
    const [disable, setDisable] = useState(false);
    const [form, setForm] = useState(false);
    const isSubgreddiitCreator = (name) => {
        return user.some((user) => {
            return name === user.user_name;
        });
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
        fetch('http://localhost:5000/api/subgrediit', options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOriginal(data);
                setData(data);
            })
            .catch(error => {
                console.log(error);
            });

        fetch('http://localhost:5000/api/subgrediit/joined', options)
            .then(response => response.json())
            .then(joined => {
                console.log(joined);
                setOrgjoin(joined);
                setJoined(joined);
            })
            .catch(error => {
                console.log(error);
            });
        fetch(`http://localhost:5000/api/profile`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
            })
            .catch(error => {
                console.log(error);
            });
        // handleDisable(filteredSubGreddits.author);


    }, []);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const searchResults = fuse.search(searchTerm);
        const filteredSubGreddits = searchResults.map(result => result.item);
        setFilteredSubGreddits(filteredSubGreddits);
        setForm(true);
        console.log('Searching for:', searchTerm);
    };
    const changesg = async (id) => {
        localStorage.setItem('subgrediit', id);
        navigate('/linksg');
    };
    const remainingSubgrediits = data.filter(subgrediit => !joined.some(joinedSubgrediit => joinedSubgrediit._id === subgrediit._id));
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
                    <center>
                        <div class="input-group" >
                            <div class="form-outline">
                                <input id="search-input" type="search" class="form-control" placeholder="Search Subgrediits" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <button type="submit" class="btn btn-dark px-2 py-0.5" onClick={handleSearch}>
                                <h4>Search</h4>
                            </button>
                        </div>
                    </center>


                    <button className="btn btn-dark btn-lg px-4" type="submit" onClick={sortButton}><h3>Sort in ascending order</h3></button>
                    {" "} {" "}{" "}{"     "}
                    <button className="btn btn-dark btn-lg px-4" type="submit" onClick={sortdescButton}><h3>Sort in descending order</h3></button>
                    {" "} {" "}{" "}{"     "}
                    <button className="btn btn-dark btn-lg px-4" type="submit" onClick={sortFollowers}><h3>Sort by number of followers</h3></button>
                    {" "} {" "}{" "}{"     "}
                    <button className="btn btn-dark btn-lg px-4" type="submit" onClick={sortByCreationTime}><h3>Sort by creation time</h3></button>


                    {form ? (
                        <div>
                            <table class="table">
                                <thead>
                                    <tr key={filteredSubGreddits._id}>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>List of banned keywords</th>
                                    </tr>
                                </thead>
                                {filteredSubGreddits.map((filteredSubGreddits) => (
                                    <tbody>
                                        <tr>
                                            <td><h3 onClick={() => changesg(filteredSubGreddits._id)}>{filteredSubGreddits.name}</h3></td>
                                            <td>{filteredSubGreddits.desc}</td>
                                            <td>{filteredSubGreddits.bankey}</td>
                                            

                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    ) :
                        <>
                            <center>
                                <div>
                                    <h1>Joined Subgrediits</h1>

                                    <table class="table">
                                        <thead>
                                            <tr key={joined._id}>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>List of banned keywords</th>
                                            </tr>
                                        </thead>
                                        {joined.map((joined) => (
                                            <tbody>
                                                <tr>
                                                    <td><h3 onClick={() => changesg(joined._id)}>{joined.name}</h3></td>
                                                    <td>{joined.desc}</td>
                                                    <td>{joined.bankey}</td>
                                                    {isSubgreddiitCreator(joined.author) && (
                                                        <td><button className="btn btn-dark btn-lg px-4" type="submit" disabled>Leave</button></td>
                                                    )}
                                                    {!isSubgreddiitCreator(joined.author) && (
                                                        <td><button className="btn btn-dark btn-lg px-4" type="submit" onClick={() => leaveButton(joined._id)}>Leave</button></td>
                                                    )}



                                                </tr>
                                            </tbody>
                                        ))

                                        }

                                    </table>
                                </div>
                                <div>
                                    <h1>Remaining Subgreddits</h1>

                                    <table class="table">
                                        <thead>
                                            <tr key={data._id}>

                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>List of banned keywords</th>
                                                <th></th>

                                            </tr>
                                        </thead>

                                        {remainingSubgrediits.map((subgrediit) => (
                                            <tbody>
                                                <tr key={subgrediit._id}>
                                                    <td><h3 onClick={() => changesg(subgrediit._id)}>{subgrediit.name}</h3></td>
                                                    <td>{subgrediit.desc}</td>
                                                    <td>{subgrediit.bankey}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-dark btn-lg px-4"
                                                            type="submit"
                                                            onClick={() => joinButton(subgrediit._id)}
                                                        >
                                                            Join
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </center>
                        </>
                    }
                </center>
            </div>



        </>
    )
}
