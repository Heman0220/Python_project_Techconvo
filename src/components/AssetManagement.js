import { Button } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./AssetManagement.css"
import TablePopulateAsset from './TablePopulateAsset'
import {db} from "../firebase"
import { useDispatch } from 'react-redux'
import {tableAssetData} from "../features/tableSlice"

function AssetManagement() {
    const dispatch = useDispatch()
    const[asset,setAsset]=useState([])
    const[commSearch,setCommSearch]=useState()
    const[projSearch,setProjSearch]=useState()
    const[teamSearch,setTeamSearch]=useState()

    const handleSearch=(e)=>{
        e.preventDefault();
        const routeRef = db.collection("tableAsset");
        const idFilter = commSearch ? routeRef.where("empid", "==", commSearch) : routeRef;
        const projectFilter = projSearch ? idFilter.where("project", "==", projSearch) : idFilter;
        const teamFilter = teamSearch ? projectFilter.where("team", "==", teamSearch) : projectFilter;
        teamFilter.get().then(snapshot=>{
            const userInfo = [];
            snapshot.docs.forEach(async assetData=>{
                userInfo[assetData.id] = assetData.data();
            })
            setAsset(Object.values(userInfo));
            setCommSearch(commSearch)
            setProjSearch(projSearch)
            setTeamSearch(teamSearch)
        })
    }

    useEffect(() => {
        db
        .collection("tableAsset")
        .orderBy("empid","desc")
        .onSnapshot(
            (snapshot)=>{
                setAsset((snapshot.docs.map((doc)=>doc.data())))
            }
        ) 
    }, [setAsset])
    dispatch(tableAssetData(asset))
    return (
        <div className="assetmgmt">
            <h2>ASSET MANAGEMENT</h2>
            <div className="assetmgmt__filter">
                <div className="assetmgmt__search">
                    <input type="text" placeholder="Search by Employee ID" value={commSearch} onChange={(e)=>setCommSearch(e.target.value)}/>
                    <Search/>
                </div>
                <div className="assetmgmt__label">
                    <label>Project</label>
                    <select className="asset__dropdown" value={projSearch} onChange={(e)=>setProjSearch(e.target.value)}>
                        <option value="Tesco">Tesco</option>
                    </select>
                </div>
                <div className="assetmgmt__label">
                    <label>Team</label>
                    <select className="asset__dropdown" value={teamSearch} onChange={(e)=>setTeamSearch(e.target.value)}>
                        <option value="Denver Development">Denver Development</option>
                    </select>
                </div>
                <Button variant="contained" color="secondary" className="assetmgmt__button" onClick={handleSearch}>Search</Button>
            </div>
            <div className="assetmgmt__table">
                <TablePopulateAsset/>
            </div>
        </div>
    )
}

export default AssetManagement
