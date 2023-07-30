
import { useState } from "react"
import React from 'react'
import logo from './Greddit.png'
import Navbar from 'react-bootstrap/Navbar';


export default function Register(props) {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [first_name, setFname] = useState('')
    const [last_name, setLname] = useState('')
    const [user_name, setUser] = useState('')
    const [age, setAge] = useState('')
    const [phone, setPno] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                first_name: first_name,
                last_name: last_name,
                user_name: user_name,
                email: email,
                pass: pass,
                phone: phone,
                age: age,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });


        props.onFormSwitch('login')
    }

    return (
        <div>
            <Navbar className="bg-nav" expand="lg">
                {/* <Container> */}

                <nav><img className="image" src={logo} width={70} height={70} /></nav>
                <Navbar.Brand href="/" className="logo-name">Greddit</Navbar.Brand>
                {/* </Container> */}
            </Navbar>
            <div className="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins">
                <div className="wrapper wrapper--w680">
                    <div className="card card-4">
                        <div className="card-body">
                            <h2 className="title"><center><b>Registration Form</b></center></h2>
                            <form method="POST">
                                <div className="row row-space">
                                    <div className="col-2">
                                        <div className="input-group">
                                            <label className="label">first name</label>
                                            <input value={first_name} onChange={(e) => setFname(e.target.value)} className="input--style-4" type="text" name="first_name" />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="input-group">
                                            <label className="label">last name</label>
                                            <input value={last_name} onChange={(e) => setLname(e.target.value)} className="input--style-4" type="text" name="last_name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row row-space">
                                    <div className="col-2">
                                        <div className="input-group">
                                            <label className="label">User name</label>
                                            <input value={user_name} onChange={(e) => setUser(e.target.value)} className="input--style-4" type="text" name="user_name" />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="input-group">
                                            <label className="label">Password</label>
                                            <input value={pass} onChange={(e) => setPass(e.target.value)} className="input--style-4" type="text" name="pass" />
                                        </div>
                                    </div>

                                </div>
                                <div className="row row-space">
                                    <div className="col-2">
                                        <div className="input-group">
                                            <label className="label">Age</label>
                                            <input value={age} onChange={(e) => setAge(e.target.value)} className="input--style-4" type="text" name="age" />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="input-group">
                                            <label className="label">Phone Number</label>
                                            <input value={phone} onChange={(e) => setPno(e.target.value)} className="input--style-4" type="text" name="phone" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="input-group">
                                        <label className="label">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="input--style-4" type="email" name="email" />
                                    </div>
                                </div>
                                <div className="p-t-15">
                                    <center>
                                        <button className="btn btn--radius-2 btn--blue" type="submit" onClick={handleSubmit}>Submit</button>
                                    </center>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



