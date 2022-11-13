import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./Register.css"
import {auth,db,storage} from "../firebase"

function Register() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[username,setUsername]=useState("")
    const[designation,setDesignation]=useState("")
    const[about,setAbout]=useState("")
    const[account,setAccount]=useState("Tesco")
    const[empid,setEmpId]=useState("")
    const history = useHistory()
    const[image,setImage]=useState(null);

    const handleChange=(e)=>{
        //get the first file you select
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        } 
    }

    const register = (e) => {
        e.preventDefault();
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state changed",
            (snapshot)=>{
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
            },
            (err)=>{
                alert(err.message)
            },
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection('users').add({
                        email,
                        password,
                        username,
                        designation,
                        about,
                        account,
                        empid,
                        imageURL: url,
                    })
                    .then(()=>{
                        auth.createUserWithEmailAndPassword(email,password)
                        .then((authUser)=>console.log(authUser))
                        .catch((error)=>{alert(error.message)})
                    })
                    .catch((error)=>{alert(error.message)})
                    setImage(null);
                })
            })
    }
    return (
        <div className="register">
            <div className="register__img">
                <img src="https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" 
                    alt="register user"
                />
            </div>
            <div className="register__form">
                <center><img src="https://www.soprahr.com/images/librariesprovider45/default-album/soprasteria_logo_rvb_exe.jpg?sfvrsn=34bb6f5b_0"
                 alt="Sopra Steria Logo"/></center>
                <form>
                    <input type="text" value={username} onChange={(e)=>setUsername((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}  placeholder="Username"/>
                    <input type="text" value={empid} onChange={(e)=>setEmpId((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}  placeholder="Employee Id"/>
                    <input type="text" value={designation} onChange={(e)=>setDesignation((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}  placeholder="Designation"/>
                    <select className="register__dropdown" value={account} onChange={(e)=>setAccount(e.target.value)}>
                        <option value="Tesco">Tesco</option>
                    </select>
                    <input type="text" value={about} onChange={(e)=>setAbout((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}  placeholder="About"/>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                    <input type="file"class="custom-file-input" onChange={handleChange}/>
                    <button type="submit" onClick={register}>Register</button>
                    <hr/>
                    <button onClick={()=>history.push("/")} >Login</button>
                </form>
            </div>
        </div>
    )
}

export default Register
