import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./Header.css"
import {auth} from "../firebase"
import { selectUserInfo } from '../features/userSlice'
import { useSelector } from 'react-redux'

function Header() {
    const history = useHistory()
    const userData = useSelector(selectUserInfo)
    return (
        <div className="header">
            <Link to="/" className="header__linklogo">
                <img src="https://www.soprahr.com/images/librariesprovider45/default-album/soprasteria_logo_rvb_exe.jpg?sfvrsn=34bb6f5b_0" 
                alt="sterialogo"/>
            </Link>
            <div className="header__right">
                <p onClick={()=>history.push("/asset")}>Asset Management</p>
                <p onClick={()=>history.push("/skill")}>Skill Matrix</p>
                <div class="dropdown">
                    <p className="dropbtn">My Profile 
                        <span>
                            <Avatar src={userData?.imageURL} 
                                alt="Shobana"
                                className="header__avatar"
                            />
                        </span>
                    </p>
                    <div class="dropdown-content">
                        <a onClick={()=>history.push("/")}>Profile</a>
                        <a onClick={()=>auth.signOut()}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
