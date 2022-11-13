import React, { useRef } from 'react'
import "./Login.css"
import {auth} from "../firebase"
import { useHistory } from 'react-router-dom';

function Login() {
    const emailRef =useRef(null);
    const passwordRef =useRef(null);
    const history = useHistory()

    const signIn = (e) => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            ).then((authUser)=>{
                console.log(authUser)
            })
            .catch((error)=>{
                alert(error.message)
            })
        history.push("/")
    }
    return (
        <div className="login">
            <div className="login__img">
                <img src="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" 
                    alt="Login user"
                />
            </div>
            <div className="login__form">
                <center><img src="https://www.soprahr.com/images/librariesprovider45/default-album/soprasteria_logo_rvb_exe.jpg?sfvrsn=34bb6f5b_0"
                 alt="Sopra Steria Logo"/></center>
                <form>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button type="submit" onClick={signIn}>Login</button>
                    <hr/>
                    <button onClick={()=>history.push("/register")}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login
