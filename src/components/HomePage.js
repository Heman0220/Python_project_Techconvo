import { Add, CalendarToday, Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import TableAssetProf from "./TableAssetProf"
import TableSkillProf from "./TableSkillProf"
import {selectUserInfo} from "../features/userSlice"
import {tableAssetData, tableSkillData} from "../features/tableSlice"
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline:'none',
    padding: theme.spacing(0, 0, 0),
    width: '30%',
    backgroundColor: 'white'
  },
}));

function HomePage() {
    const dispatch = useDispatch()
    const userData = useSelector(selectUserInfo)
    const classes = useStyles();
    const [assetOpen, setAssetOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const[team,setTeam]=useState("Denver Development")
    const[assetid,setAssetID]=useState()
    const[assetname,setAssetName]=useState()
    const[assetmodel,setAssetModel]=useState()
    const[allocationdate,setAllocationDate]=useState()
    const[comments,setComments]=useState()
    const[technology,setTechnology]=useState()
    const[expertise,setExpertise]=useState("Beginner")
    const[lastused,setLastUsed]=useState()
    const[certification,setCertification]=useState()

    const handleAssetOpen = () => {
        setAssetOpen(true);
    };

    const handleAssetClose = () => {
        setAssetOpen(false);
    };

    const handleDateChange = (date) => {
        const lastDate = moment(date).format("yyyy-MM-DD")
        setLastUsed(lastDate)
    }
    const handleAllocationDateChange = (date) => {
        const allocationDate = moment(date).format("yyyy-MM-DD")
        setAllocationDate(allocationDate)
    }

    const handleAssetAdd = (e) => {
        e.preventDefault();
        db.collection('tableAsset').add({
            empid: userData.empid,
            name: userData.username,
            project: userData.account,
            team,
            assetid,
            assetname,
            assetmodel,
            allocationdate,
            comments
        })
        .then(()=>{
            setAssetOpen(false);
            db.collection('tableAsset')
            .where('empid','==',userData?.empid)
            .get()
            .then(querySnapshot =>  {
                const userInfo = [];
                querySnapshot.forEach(async assetData => {
                    userInfo[assetData.id] = assetData.data();
                })
                dispatch(tableAssetData(Object.values(userInfo)));
            }
            ) 
        })
        .catch((error)=>{alert(error.message)})
        setTeam('Denver Development')
        setAssetID()
        setAssetName()
        setAssetModel()
        setAllocationDate()
        setComments()
    }
    const handleSkillAdd = (e) => {
        e.preventDefault();
        db.collection('skillMat').add({
            empid: userData?.empid,
            name: userData?.username,
            project: userData?.account,
            team,
            technology,
            expertise,
            lastused,
            certification,
            comments
        })
        .then(()=>{
            setOpen(false);
            db.collection('skillMat')
            .where('empid','==',userData?.empid)
            .get()
            .then(querySnapshot =>  {
                const skillInfo = [];
                querySnapshot.forEach(async skillData => {
                    skillInfo[skillData.id] = skillData.data();
                })
                dispatch(tableSkillData(Object.values(skillInfo)));
            }
            )
        })
        .catch((error)=>{alert(error.message)})
        setTeam('Denver Development')
        setTechnology()
        setExpertise("Beginner")
        setLastUsed()
        setCertification()
        setComments()
    }
    const handleSkillOpen = () => {
        setOpen(true);
    };

    const handleSkillClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        if(userData){
        db.collection('tableAsset')
            .where('empid','==',userData?.empid)
            .get()
            .then(querySnapshot =>  {
                const userInfo = [];
                querySnapshot.forEach(async assetData => {
                    userInfo[assetData.id] = assetData.data();
                })
                dispatch(tableAssetData(Object.values(userInfo)));
            }
            ) 
        }
    },[userData])

    useEffect(()=>{
        if(userData){
        db.collection('skillMat')
            .where('empid','==',userData?.empid)
            .get()
            .then(querySnapshot =>  {
                const skillInfo = [];
                querySnapshot.forEach(async skillData => {
                    skillInfo[skillData.id] = skillData.data();
                })
                dispatch(tableSkillData(Object.values(skillInfo)));
            }
            )
        }
    },[userData])

    return (
        <div className="home">
            <div className="home__profile">
                <img src={userData?.imageURL} 
                    alt="Profile Image"/>
                <div className="home__profiledata">
                    <h3>{userData?.username}</h3>
                    <p>{userData?.designation}</p>
                    <p>{userData?.about}</p>
                    <p>{userData?.account}</p>
                </div>
            </div>
            <div className="home__assets">
                <h2>ASSETS <Add onClick={handleAssetOpen}/></h2>
                <TableAssetProf/>
            </div>
            <div className="home__skillset">
                <h2>SKILL SET <Add onClick={handleSkillOpen}/></h2>
                <TableSkillProf/>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={assetOpen}
                onClose={handleAssetClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={assetOpen}>
                <div  className={classes.paper}>
                    <div className="modal__header">
                        <h2>Add Asset</h2>
                        <Close className="modal__close" onClick={handleAssetClose}/>
                    </div>
                    <form className="modal__div">
                        <select className="modal__dropdown" value={team} onChange={(e)=>setTeam(e.target.value)}>
                            <option value="Denver Development">Denver Development</option>
                        </select>
                        <input  type="text" value={assetid} onChange={(e)=>setAssetID((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}placeholder="Asset Id"/>
                        <input  type="text" value={assetname} onChange={(e)=>setAssetName((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}placeholder="Asset Name"/>
                        <input  type="text" value={assetmodel} onChange={(e)=>setAssetModel((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}placeholder="Asset Model"/>
                        <DatePicker className="modal__select"
                            dateFormat="yyyy-MM-dd"
                            selected={Date.parse(allocationdate)} 
                            onChange={handleAllocationDateChange} 
                            placeholderText="Allocation Date" 
                            closeOnScroll={true}
                        />
                        <input  type="text" value={comments} onChange={(e)=>setComments((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))}placeholder="Comments"/>
                        <Button variant="contained" color="secondary" type="submit" onClick={handleAssetAdd}>Add</Button>
                    </form>
                </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleSkillClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div  className={classes.paper}>
                    <div className="modal__header">
                        <h2>Add Skill</h2>
                        <Close className="modal__close" onClick={handleSkillClose}/>
                    </div>
                    <form className="modal__div">
                        <select className="modal__dropdown" value={team} onChange={(e)=>setTeam(e.target.value)}>
                            <option value="Denver Development">Denver Development</option>
                        </select>
                        <input  type="text" value={technology} onChange={(e)=>setTechnology((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))} placeholder="Technology"/>
                        <select className="modal__dropdown" value={expertise} onChange={(e)=>setExpertise(e.target.value)}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <DatePicker className="modal__select"
                            dateFormat="yyyy-MM-dd"
                            selected={Date.parse(lastused)} 
                            onChange={handleDateChange} 
                            placeholderText="Last Used Date" 
                            closeOnScroll={true}
                        />
                        <input  type="text"value={certification} onChange={(e)=>setCertification((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))} placeholder="Certification"/>
                        <input  type="text"value={comments} onChange={(e)=>setComments((e.target.value).replace(/(\B)[^ ]*/g, match => (match.toLowerCase())).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))} placeholder="Comments"/>
                        <Button variant="contained" color="secondary" type="submit" onClick={handleSkillAdd}>Add</Button>
                    </form>
                </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default HomePage
