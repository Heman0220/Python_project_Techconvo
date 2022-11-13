import { Button } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./SkillMatrix.css"
import TablePopulateSkill from './TablePopulateSkill'
import {db} from "../firebase"
import { useDispatch, useSelector} from 'react-redux'
import {tableSkillData,selectTableSkill} from "../features/tableSlice"

function SkillMatrix() {
    const skilltab = useSelector(selectTableSkill)
    const dispatch = useDispatch()
    const[skill,setSkill]=useState([])
    const[commSearch,setCommSearch]=useState()
    const[projSearch,setProjSearch]=useState()
    const[teamSearch,setTeamSearch]=useState()

    const handleSearch=(e)=>{
        e.preventDefault();
        const routeRef = db.collection("skillMat");
        const idFilter = commSearch ? routeRef.where("empid", "==", commSearch) : routeRef;
        const projectFilter = projSearch ? idFilter.where("project", "==", projSearch) : idFilter;
        const teamFilter = teamSearch ? projectFilter.where("team", "==", teamSearch) : projectFilter;
        teamFilter.get().then(snapshot=>{
            const userInfo = [];
            snapshot.docs.forEach(async skillData=>{
                userInfo[skillData.id] = skillData.data();
            })
            setSkill(Object.values(userInfo));
            setCommSearch(commSearch)
            setProjSearch(projSearch)
            setTeamSearch(teamSearch)
        })
    }
    useEffect(() => {
        db
        .collection("skillMat")
        .orderBy("empid","desc")
        .onSnapshot(
            (snapshot)=>{
                setSkill((snapshot.docs.map((doc)=>doc.data())))
            }
        ) 
    }, [setSkill])
    dispatch(tableSkillData(skill))
    return (
        <div className="skillmatrix">
            <h2>SKILL MATRIX</h2>
            <div className="skillmatrix__filter">
                <div className="skillmatrix__search">
                <input type="text" placeholder="Search by Employee ID" value={commSearch} onChange={(e)=>setCommSearch(e.target.value)}/>
                    <Search/>
                </div>
                <div className="skillmatrix__label">
                    <label>Project</label> 
                    <select className="skill__dropdown" value={projSearch} onChange={(e)=>setProjSearch(e.target.value)}>
                        <option value="Tesco">Tesco</option>
                    </select>
                </div>
                <div className="skillmatrix__label">
                    <label>Team</label> 
                    <select className="skill__dropdown" value={teamSearch} onChange={(e)=>setTeamSearch(e.target.value)}>
                        <option value="Denver Development">Denver Development</option>
                    </select>
                </div>
                <Button variant="contained" color="secondary" className="skillmatrix__button" onClick={handleSearch}>Search</Button>
            </div>
            <div className="skillmatrix__table">
                <TablePopulateSkill/>
            </div>
        </div>
    )
}

export default SkillMatrix
