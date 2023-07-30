import React, {  useEffect, useState } from 'react'
// import { useEffect } from 'react'
import logo from './Greddit.png'
import { useNavigate } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';



export default function Login(props) {

    const [user_name, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    let navigate = useNavigate();
    function handleSubmit() {

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name, pass })
          })
          .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('sessionToken', 'loggedin');
                    localStorage.setItem('username', user_name);
                    navigate('/', { state: { emailID: user_name } });
                  });
            } else {
              alert("Invalid username or password")
            }
          })
          .catch(error => {
            console.error(error);
          });
       
        
    }
    
   
    return (
        <>
            <Navbar className="bg-nav" expand="lg">
                    <nav><img className="image" src={logo} width={70} height={70} /></nav>
                    <Navbar.Brand href="#home" className="logo-name">Greddit</Navbar.Brand>
                    <Container>
                        <div className='text-title'><center>Welcome to Greddit</center></div>
                    </Container>
               
            </Navbar>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white">
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input value={user_name} onChange={(e) => setEmail(e.target.value)} type="email" id="typeEmailX" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="typeEmailX">User Name</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="typePasswordX" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>

                                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="/">Forgot password?</a></p>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>
                                        </div>
                                        <div>
                                            <p className="mb-0">Don't have an account?</p>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={() => props.onFormSwitch('register')}>Register</button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </>


                )
}
